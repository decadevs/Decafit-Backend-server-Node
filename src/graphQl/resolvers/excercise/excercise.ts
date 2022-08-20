import { createExcercise, getAllExercises, deleteExcercise,
    updateExcercise,getExcerciseById} from '../../../controller/excercise/excerciseController';
import { newContext } from '../../../middlewares/check-auth';
import {argsForExcercise, argsForCreateExcercise, argsToUpdateExcercise} from './excercise.types'

const excerciseresolvers = {
  Query: {
    excercises: async (
      _: unknown,
      args: argsForExcercise,
      context: { req: { headers: { authorization: string } } },
    ): Promise<unknown> => {
      newContext(context);
      const res = await getAllExercises();
      return res;
    },
    excercise: async (
        _: unknown,
        args: { id: string },
        context: { req: { headers: { authorization: string } } },
      ): Promise<unknown> => {
        newContext(context);
        const id = args.id;
        return await getExcerciseById(id);
      },
  },
  Mutation: {
    async excerciseCreate(
      _: unknown,
      args: argsForCreateExcercise,
      context: { req: { headers: { authorization: string } } },
    ): Promise<unknown> {
      newContext(context);
      return await createExcercise(args.input, args.workoutId);
    },
    excerciseDelete: async (
      _: unknown,
      args: { id: string },
      context: { req: { headers: { authorization: string } } },
    ): Promise<unknown> => {
      newContext(context);
      const id = args.id;
      return await deleteExcercise(id);
    },
    excerciseUpdate: async (
      _: unknown,
      args: argsToUpdateExcercise,
      context: { req: { headers: { authorization: string } } },
    ): Promise<unknown> => {
      newContext(context);
      const id = args.input.id;
      const { title, description,image,type} = args.input;
      const excercise = { title, description,image,type};
      return await updateExcercise(id, excercise);
    },
  },
};
export default excerciseresolvers;
