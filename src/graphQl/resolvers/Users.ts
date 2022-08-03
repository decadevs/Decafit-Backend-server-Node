import { signUp, userSignIn, getAllUsers, getUserById } from '../../controller/userController';
import { newContext } from '../../middlewares/check-auth';
interface CreateUserRegisterInput {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}
interface ArgsForCreateRegisterUser {
  user: CreateUserRegisterInput;
}

interface CreateUserLoginInput {
  email: string;
  password: string;
}
interface ArgsForLoginUser {
  user: CreateUserLoginInput;
}
const userresolvers = {
  Query: {
    users: async (
      _: unknown,
      args: ArgsForCreateRegisterUser,
      context: { req: { headers: { authorization: string } } },
    ): Promise<unknown> => {
      newContext(context);
      const res = await getAllUsers();
      return res;
    },
    user: async (
      _: unknown,
      args: { id: string },
      context: { req: { headers: { authorization: string } } },
    ): Promise<unknown> => {
      newContext(context);
      const id = args.id;
      return await getUserById(id);
    },
  },
  Mutation: {
    async login(_: unknown, args: ArgsForLoginUser): Promise<unknown> {
      const res = await userSignIn(args.user);
      return res;
    },
    async register(_: unknown, args: ArgsForCreateRegisterUser): Promise<unknown> {
      const res = await signUp(args.user);
      return res;
    },
  },
};
export default userresolvers;
