import bcrypt from 'bcryptjs';
import { User } from '../model/userModel';
import { UserInputError } from 'apollo-server-express';
import { validateRegisterInput, validateLoginInput } from '../utils/validators';
import mailer from '../middlewares/sendMail';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { generateToken } from '../utils/utils';
import {template} from '../utils/email-template'

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

interface createVerify{
    token:string;
}
    // Get all users 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAllUsers():Promise<any>{
    try {
        const data = await User.find({});
        return {
        data,
        }
    } catch (err){
        throw new Error('User not found');
    }
}

// Get all users by ID
export async function getUserById(user:string):Promise<unknown>{
    try {
        const singleUser =await User.findOne({_id: user})
        if (singleUser){
            return singleUser
        } else {
            throw new Error('post not found')
        }
    } catch (err){
       throw new Error('Internal server Error')
    }
}

export async function signUp(user: createUserInput): Promise<unknown> {
  try {
    //Validate user data
  const { valid, errors } = validateRegisterInput(user);
  if (!valid) {
    throw new UserInputError('Errors', { errors });
  }
  //Make sure user does not already exist
  const findUser = await User.findOne({ email: user.email });
  if (findUser) {
    throw new UserInputError('This email already exist', {
      errors: {
        email: 'This email already exist!',
      },
    });
  }

  // check if the phone number already exist
  const findPhone = await User.findOne({ phoneNumber: user.phoneNumber });
  if (findPhone) {
    throw new UserInputError('This phone number already exist', {
      errors: {
        email: 'This phone number already exist!',
      },
    });
  }

  // hash the password and create an authentication token
  const password = await bcrypt.hash(user.password, 12);

  const newUser = new User({
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    password,
    createdAt: new Date().toISOString(),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res: any = await newUser.save();
   const { _id: id } = res;
  const payload = { id }
  const token = jwt.sign(payload, jwtsecret, { expiresIn: '30mins' });
  //Compose an email
  //const link = `${process.env.FontEndUrl}/users/verify/${token}`;
  const html = template(token);
  // Send email
  await mailer.sendEmail(fromUser, user.email as string, 'Please verify your email!', html);

  return {
    message: 'Registration Successful! Please verify your email.',
    ...res._doc,
    id: res._id,
  };
  } catch (err){
    throw new Error(`Internal server Error ${err}`)
  }
}

// User Verification
export async function verifyUser(user: createVerify): Promise<unknown> {
 try {
  const decode = jwt.verify(user.token, jwtsecret) as JwtPayload
  const checkUser = await User.findOne({ _id: decode.id });
  if (!checkUser){
      throw new UserInputError('You are not authorized')
  } 
  
      checkUser.verified = true;
      const { _id, email } = await  checkUser.save();
      const token = generateToken({ _id, email });
      return {
          message:'Successful Thank you! Now you may login.',
          verified:checkUser.verified,
          token
        };
 } catch (err){
   throw new Error(`Internal server error ${err} `)
 }

  }

  // User signIn
export async function userSignIn(loginuser: createdLoginUserInput): Promise<unknown> {
try {
  const { valid, errors } = validateLoginInput(loginuser);
  if (!valid) {
    throw new UserInputError('Errors', { errors });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const findUser:any = await User.findOne({ email: loginuser.email });
    const { _id } = findUser;
    const token = generateToken({ _id});
   
    if (!findUser.verified) {
       throw new Error('User is not authenticated')
    }
  
  if (!findUser) {
    throw new Error('Email is not found')
  }
  const match = await bcrypt.compare(loginuser.password, findUser.password);
  if (!match) {
    errors.general = 'Wrong credentials';
    throw new UserInputError('Wrong Credentials', { errors });
  }

  return {
    message:'Successfully logged in',
    ...findUser._doc,
    id: findUser._id,
    token,
  };
} catch (err) {
  throw new Error(`Internal server Error ${err}`)
}
}
