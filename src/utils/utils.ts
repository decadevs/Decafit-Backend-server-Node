import jwt from 'jsonwebtoken';

// Generate token
export const generateToken = (user: { [key: string]: string }):unknown => {
  const pass = process.env.JWT_SECRET as string
  return jwt.sign(user, pass, { expiresIn: '30d' });
};

