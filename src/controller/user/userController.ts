import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { User, UserType } from '../../model/userModel';
import { UserInputError } from 'apollo-server-express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { generateToken, registerSchema, options, loginSchema } from '../../utils/utils';
import { emailVerificationView } from '../../../views/ts/email-verification';
import { passwordResetView } from '../../../views/ts/password-reset';
import { createdLoginUserInput, createUserInput } from './user.interface';
import { IEmailRequest } from '../../interfaces/email.type';
import { getEmitter } from '../../events/emitter';
import { AppEvents } from '../../events/events';

const jwtsecret = process.env.JWT_SECRET as string;

export async function getUser(req: Request, res: Response): Promise<unknown> {
  const user = await User.find();
  if (user) return res.status(200).json(user)
}

export async function getAllUsers(): Promise<Array<UserType>> {
  let data: Array<UserType> = [];
  try {
    data = await User.find();
  } catch (err) {
    throw new Error('User not found');
  }
  return data;
}

export async function getUserById(id: string): Promise<UserType> {
  let user: UserType;
  try {
    user = (await User.findById(id)) || ({} as UserType);
  } catch (error) {
    throw new Error('Internal server Error');
  }
  return user;
}

export async function signUp(user: createUserInput): Promise<unknown> {
  try {
    let userss: UserType = {} as UserType;
    const validationResult = registerSchema.validate(user, options);
    if (validationResult.error) {
      throw new Error(validationResult.error.details[0].message);
    }
    const findUser = await User.findOne({ email: user.email });
    if (findUser) {
      throw new UserInputError('This email already exist', {
        errors: {
          email: 'This email already exist!',
        },
      });
    }

    const findPhone = await User.findOne({ phoneNumber: user.phoneNumber });
    if (findPhone) {
      throw new UserInputError('This phone number already exist', {
        errors: {
          email: 'This phone number already exist!',
        },
      });
    }

    const password = await bcrypt.hash(user.password, 12);

    const newUser = new User({
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password,
      createdAt: new Date().toISOString(),
    });

    userss = await newUser.save();
    const { _id: id } = userss;
    const payload = { id };
    const token = jwt.sign(payload, jwtsecret, { expiresIn: '30mins' });

    const html = emailVerificationView(token);

    const emailRequest: IEmailRequest = {
      to: user.email,
      subject: 'Please verify your email!',
      message: html,
    } 
    getEmitter().emit(AppEvents.EMAIL_START, emailRequest);

    return {
      message: 'Registration Successful! Please verify your email.',
      id: userss._id,
      fullName: userss.fullName,
      email: userss.email,
      phoneNumber: userss.phoneNumber,
    };
  } catch (err) {
    throw new Error(`${err}`);
  }
}

export async function verifyUser(req: Request, res: Response): Promise<void> {
  try {
    const { secretToken } = req.params;
    const decode = jwt.verify(secretToken, jwtsecret) as JwtPayload;
    const user = await User.findOne({ _id: decode.id });
    if (!user) {
      res.status(400).json({ error: 'You are not authorized' });
      return;
    }

    user.verified = true;
    let data = await user.save();
    if (data) {
      res.render('confirmEmail');
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function userSignIn(user: createdLoginUserInput): Promise<unknown> {
  try {
    const validationResult = loginSchema.validate(user, options);

    if (validationResult.error) {
      throw new Error(validationResult.error.details[0].message);
    }

    const findUser = (await User.findOne({ email: user.email })) as { [key: string]: string };
    if (!findUser) {
      throw new Error('Email not found');
    }

    if (!findUser.verified) {
      throw new Error('User is not authenticated');
    }

    const match = await bcrypt.compare(user.password, findUser.password);
    if (!match) {
      throw new UserInputError('Wrong Credentials');
    }

    const { _id } = findUser;
    const token = generateToken({ _id });

    return {
      message: 'You have Successfully logged in',
      id: findUser._id,
      fullName: findUser.fullName,
      email: findUser.email,
      phoneNumber: findUser.phoneNumber,
      createdAt: findUser.createdAt,
      token,
    };
  } catch (err) {
    throw new Error(`${err}`);
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

  try {
    // Send email

    const emailRequest: IEmailRequest = {
      to: users.email,
      subject: 'Please verify your email!',
      message: passwordResetView(link),
    } 

    getEmitter().emit(AppEvents.EMAIL_START, emailRequest);

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
  try {
    if (req && req.user) {
      const { _id, email } = req.user as { [key: string]: string };
    const token = generateToken({ _id, email });
    res.status(200).json({
      message: 'Login sucessful',
      token: token,
    });
    }
  } catch (err) {
    throw new Error(`${err}`);
  }
}

export async function loginFail(req: Request, res: Response): Promise<void> {
  try {
    res.status(200).json({
      message: 'User authentication failed',
    });
  } catch (err) {
    throw new Error(`${err}`);
  }
}
