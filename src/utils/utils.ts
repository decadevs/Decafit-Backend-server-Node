import jwt from 'jsonwebtoken';
import Joi from 'joi';

// Generate token
export const generateToken = (user: { [key: string]: unknown }):unknown => {
  const pass = process.env.JWT_SECRET as string
  return jwt.sign(user, pass, { expiresIn: '30d' });
};

// Validation Schema
export const registerSchema = Joi.object().keys({
  fullName: Joi.string().required(),
  email: Joi.string().trim().lowercase().email({ minDomainSegments: 2 }).required(),
  phoneNumber: Joi.number(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});
