import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../model/userModel';
const secret = process.env.JWT_SECRET as string;

export async function auth(req: Request, res: Response, next: NextFunction):Promise<unknown> {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).send({ error: 'Kindly sign in as a user' });
    }
    const token = authorization.slice(7, authorization.length);
    let verified = jwt.verify(token, secret);
    if (!verified) {
      return res.status(401).send({ error: 'User not verified you cannot access this route' });
    }
    const { _id } = verified as { [key: string]: string };
    const user = (await User.findById(_id)) as unknown as {
      [key: string]: string | boolean;
    };

    if (!user.active) {
      return res
        .status(401)
        .send({ error: 'User not Verified, kindly check you email to verify' });
    }
    req.user  = verified;
    next();
  } catch (err) {
    res.status(401).send({ error: 'User not logged In' });
  }
}