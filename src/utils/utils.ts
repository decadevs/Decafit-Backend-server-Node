import verifyToken from 'jsonwebtoken';
import Joi from 'joi';
// Generate token
export const generateToken = (user: { [key: string]: string }):unknown => {
  const pass = process.env.JWT_SECRET as string
  return verifyToken.sign(user, pass, { expiresIn: '30d' });
};

// Validation Schema

  export const registerSchema = Joi.object().keys({
  fullName: Joi.string().required(),
  email: Joi.string().trim().lowercase().required(),
  phoneNumber: Joi.string(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

export const options ={
  abortEarly:false,
  errors:{
      wrap:{
          label: ''
      }
  }
}