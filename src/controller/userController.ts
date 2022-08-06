import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { User, UserType } from '../model/userModel';
import { UserInputError } from 'apollo-server-express';
import mailer from '../middlewares/sendMail';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { generateToken, registerSchema, options, loginSchema } from '../utils/utils';
import { template } from '../Email/email-template';

const fromUser = process.env.FROM as string;
const jwtsecret = process.env.JWT_SECRET as string;

interface createUserInput {
  fullName: string;
  password: string;
  phoneNumber: string;
  email: string;
}
interface createdLoginUserInput {
  email: string;
  password: string;
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

    const html = template(token);
    await mailer.sendEmail(fromUser, user.email as string, 'Please verify your email!', html);

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

// SSO PASSPORT ROUTE CONTROLLER
export async function loginSuccess(req: Request, res: Response): Promise<void> {
  try {
    const { _id, email } = req.user as { [key: string]: string };
    const token = generateToken({ _id, email });
    res.status(200).json({
      message: 'Login sucessful',
      token: token,
    });
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
