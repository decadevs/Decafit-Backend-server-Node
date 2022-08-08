import verifyToken from 'jsonwebtoken';
import Joi from 'joi';
// Generate token
export const generateToken = (user: { [key: string]: string }):unknown => {
  const pass = process.env.JWT_SECRET as string
  return verifyToken.sign(user, pass, { expiresIn: '30d' });
};

// Validation Schema

const passwordPath = {
  password: Joi.string()
  .regex(/^[a-zA-Z0-9]{3,30}$/)
  .required(),
}
const phoneNumberRegex = 
/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;
  export const registerSchema = Joi.object().keys({
  fullName: Joi.string().required(),
  email: Joi.string().email().trim().lowercase().required(),
  phoneNumber: Joi.string().regex(phoneNumberRegex),
  ...passwordPath,
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().trim().lowercase().required(),
  ...passwordPath,
});

export const options ={
  abortEarly:false,
  errors:{
      wrap:{
          label: ''
      }
  }
}
