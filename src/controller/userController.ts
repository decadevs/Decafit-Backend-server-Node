import { Request, Response } from 'express';
import { User, UserType } from '../model/userModel';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mailer from '../middlewares/sendMail';
import { generateToken, registerSchema } from '../utils/utils';

const jwtsecret = process.env.JWT_SECRET as string;
const fromUser = process.env.FROM as string;

export async function getUser(req: Request, res: Response): Promise<unknown> {
  const user = await User.find();
  if (user) return res.status(200).json(user)
}

export async function getUserById(req: Request, res: Response): Promise<unknown> {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(400).json({ error: 'User not found' });
  const { fullName, email, phoneNumber } = user;
  return res.status(200).json({ fullName, email, phoneNumber });
}

export async function signUp(req: Request, res: Response): Promise<unknown> {
  try {
    const { fullName, email, password, phoneNumber } = req.body;
    const { error } = registerSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const usedPhonenumber = await User.findOne({ phoneNumber });
    const oldUser = await User.findOne({ email });

    if (usedPhonenumber) {
      return res.status(409).json({
        message: 'Phone number is already used.kindly Use a different phone number ',
      });
    }

    if (oldUser) {
      return res.status(409).json({
        message: 'User already exist. Please login',
      });
    }

    const passwordHash = await bcrypt.hash(password, 8);
    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password: passwordHash,
    });
    const user: UserType = await newUser.save();
    const { _id } = user;
    const newsecretToken = jwt.sign({ _id, email }, jwtsecret, {
      expiresIn: '30min',
    });

    //Compose an email
    const link = `${process.env.backendUrl}/users/verify/${newsecretToken}`
    const html = `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
               <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to Decafit.</h2>
                <p>Congratulations! You're almost set to start using Decafit App.
                    Just click the button below to verify your email address.
                </p>
                 <a href=${link}
                 style="background: crimson; text-decoration: none; color: white; 
                  padding: 10px 20px; margin: 10px 0; 
                 display: inline-block;">Click here</a>
                </div>
            `;
    // Send email
    await mailer.sendEmail(fromUser, user.email as string, 'Please verify your email!', html);

    res.status(201).json({
      message: 'Registration Successful! Please verify your email.',
      user,
      link:link 
    });
  } catch (err) {
    res.status(500).json({
      message: 'server error',
    });
  }
}

export async function verifyUser(req: Request, res: Response): Promise<void> {
  try {
    const { secretToken } = req.params;
    const decode = jwt.verify(secretToken, jwtsecret) as JwtPayload;
    // Find account with matching jwtsecret token
    const user = await User.findOne({ email: decode.email });
    if (!user) {
      res.status(400).json({ error: 'Error! No user found.' });
      return;
    }

    user.active = true;
    const { _id, email } = await user.save();
    const token = generateToken({ _id, email });
    //res.redirect(`${process.env.URL}/profile/${token}`);
    res.status(200).json({ message: 'Successful Thank you! Now you may login.', token: token });
  } catch (error) {
    const message = 'Internal server Error';
    res.status(500).json({ error: message });
  }
}

export async function userSignIn(req: Request, res: Response): Promise<unknown> {
  try {
    const { email, password } = req.body;
    const user = (await User.findOne({ email })) as { [key: string]: string };

    const { _id } = user;
    const token = generateToken({ _id, email });

    if (!user.active) {
      return res.status(401).json({
        error: 'user not verified',
        status: 401,
      });
    }

    if (!password) {
      return res.status(400).json({
        message: 'Password is required',
      });
    }
    const validUser = await bcrypt.compare(password, user.password);
    if (validUser) {
      return res.status(200).json({
        status: 'Successfully logged in',
        token,
        user,
      });
    } 
   return res.status(400).json({ error: 'invalid email/password' });
  } catch (err) {
    res.status(404).json({ error: 'invalid details check again' });
  }
}

export const postForgotPassword = async (req: Request, res: Response): Promise<unknown> => {
  //cheking if the user exist
  const { email } = req.body;
  if (!email) return res.status(404).json({ error: 'Email is required' });
  const users = await User.findOne({ email });
  if (!users) return res.status(404).json({ error: 'User not registered' });

  //creating one time link that is valid for 30mins
  const { _id: id } = users;

  const payload = { email, id };
  const token = jwt.sign(payload, jwtsecret, { expiresIn: '30mins' });

  const link = `${process.env.backendUrl}/users/reset-password/${token}`;

  const body = `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
               <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to Decafit.</h2>
                <p>Hi there, Follow the link by clicking on the button 
                </p>
                 <a href=${link}
                 style="background: crimson; text-decoration: none; color: white; 
                  padding: 10px 20px; margin: 10px 0; 
                 display: inline-block;">Click here</a>
                 to change your password. The link will expire in 30 mins.
                </div>
            `;

  try {
    // Send email
    await mailer.sendEmail(fromUser, users.email, 'Please verify your email!', body);

    res.status(201).json({
      message: 'Password reset link has been sent to your email...',
      token,
      link: link,
    });
  } catch (err) {
    const message = 'Internal server Error';
    res.status(500).json({ error: message });
  }
};
export const postResetPassword = async (req: Request, res: Response): Promise<unknown> => {
  const { token } = req.params;

  const userDetails = jwt.verify(token, jwtsecret);

  const { id } = userDetails as { [key: string]: string };

  const { password, confirmPassword } = req.body;
  if (!password) return res.status(404).json({ error: 'password and confirm password are required' });
  let users = await User.findById(id);
  if (!users) return res.status(404).json({ error: 'Invalid ID...' });
  //we have a valid id, and we have a valid user with this id
  try {
    const response = jwt.verify(token, jwtsecret);
    if (response) {
      //validate password and password2 should match
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'password and confirm password does not match!' });
      }
      // hash password before saving;
      users.password = await bcrypt.hash(password, 8);

      const updatedUser = await users.save();
      const data = { 
        message: 'Password was sucessfully changed',
        user: updatedUser, 
        };
      return res.status(201).json(data);
    }
  } catch (error) {
    const message = 'Internal server Error';
    res.status(500).json({ error: message });
  }
};

// Change password from dashboard
export const changePassword = async (req: Request, res: Response):Promise<unknown> => {
  //get user from the collection
  const { _id: id } = req.user as { [key: string]: string; };

  const users = await User.findById(id);
  if (!users) return res.status(404).json({ error: 'Invalid ID...' });
  const { password } = users;

  try {
    const { oldPassword, newPassword, repeatPassword } = req.body;
    if (!oldPassword || !newPassword || !repeatPassword)
      return res.status(404).json({
        error: 'oldPassword, newPassword, repeatPassword fields not set',
      });

    const validOldPassword = bcrypt.compareSync(oldPassword, password);
    if (!validOldPassword)
      return res.status(400).json({ error: 'Old password is incorrect!' });
    if (newPassword !== repeatPassword)
      return res.status(400).json({
        error: 'New Password and Re-enterd New Password does not match!',
      });

    users.password = await bcrypt.hash(repeatPassword, 8);
    const user = await users.save();
    res.status(201).json({ message: 'You have successfully changed your password', user:user });
  } catch (error) {
    const message = 'Internal server Error';
    res.status(400).json({ error: message });
  }
};

// SSO PASSPORT ROUTE CONTROLLER
export async function loginSuccess(req: Request, res: Response): Promise<void> {
  const { _id, email } = req.user as { [key: string]: string };
  const token = generateToken({ _id, email });
  res.status(200).json({
    message: 'Login sucessful',
    token: token,
  });
}

export async function loginFail(req: Request, res: Response): Promise<void> {
  res.status(200).json({
    message: 'User authentication failed',
  });
}
