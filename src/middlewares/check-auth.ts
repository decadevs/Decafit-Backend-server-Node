import { AuthenticationError } from 'apollo-server-errors';
import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET as string;
interface newUser{
    _id:string
}
export const newContext = (context: { req: { headers: { authorization: string } } }):newUser=>{
 const authHeader = context.req.headers.authorization;
 if (authHeader){
     //Bearer ...
     const token = authHeader.split('Bearer ')[1];
     if (token){
         try {
           const user = jwt.verify(token,secret) ;
           return user as newUser;
         } catch (err){
             throw new  AuthenticationError('Invalid/Expired token')
         }
     }
     throw new Error('Authentication token must be \'Bearer [token]')
 }
 throw new Error('Authuorization header must be provided')
}