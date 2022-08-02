import {signUp,userSignIn,verifyUser, getAllUsers,getUserById} from '../../controller/userController'
import {newContext} from '../../middlewares/check-auth'
interface createUserRegisterInput{
    fullName:string
    email: string
    phoneNumber:string
    password:string
  
}

interface CreateToken{
    token:string
}
interface argsForToken{
    user :CreateToken
}
interface argsForCreateRegisterUser{
    user:createUserRegisterInput
}

interface createUserLoginInput{
    email:string
    password:string

}
const userresolvers = {
    Query:{
        users:async (_:unknown, args:argsForCreateRegisterUser,
            context:{ req: { headers: { authorization: string; }; }; }):Promise<unknown>=>{
            newContext(context)
            const res = await getAllUsers()
             return res
        },
        userById:async (_:unknown,args:{id:string},
            context:{ req: { headers: { authorization: string; }; }; }):Promise<unknown> => {
            const user = newContext(context)
            // const id = args.id
            return await getUserById(user);
        }
    },
    Mutation :{
         async login(_:unknown, args: createUserLoginInput):Promise<unknown>{
            return await userSignIn(args)
         },
         async register(_:unknown, args:argsForCreateRegisterUser):Promise<unknown>{
             const res = await signUp(args.user)
             return res
         },
         async verify(_:unknown, args:argsForToken):Promise<unknown>{
            const res = await verifyUser(args.user)
            return res
        }
     }
 }
export default userresolvers