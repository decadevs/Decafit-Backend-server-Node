import { signUp, userSignIn, getAllUsers, getUserById } from '../../../controller/user/userController';
import { newContext } from '../../../middlewares/check-auth';
import { ArgsForCreateRegisterUser, ArgsForLoginUser } from './user.types';

const userResolvers = {
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
export default userResolvers;
