import { getAllWorkouts, createWorkouts, deleteWorkout, 
    updateWorkout,getWorkoutById } from '../../../controller/workout/workoutController';
import { newContext } from '../../../middlewares/check-auth';
import {argsForCreateWorkout,argsForWorkout,argsToUpdateWorkout} from './workout.types'

const workoutresolvers = {
  Query: {
    workouts: async (
      _: unknown,
      args: argsForWorkout,
      context: { req: { headers: { authorization: string } } },
    ): Promise<unknown> => {
      newContext(context);
      const res = await getAllWorkouts();
      return res;
    },
    workout: async (
        _: unknown,
        args: { id: string },
        context: { req: { headers: { authorization: string } } },
      ): Promise<unknown> => {
        newContext(context);
        const id = args.id;
        return await getWorkoutById(id);
      },
  },
  Mutation: {
    async  workoutCreate(
      _: unknown,
      args: argsForCreateWorkout,
      context: { req: { headers: { authorization: string } } },
    ): Promise<unknown> {
      newContext(context);
      return await createWorkouts(args.input);
    },
    workoutDelete: async (
      _: unknown,
      args: { id: string },
      context: { req: { headers: { authorization: string } } },
    ): Promise<unknown> => {
      newContext(context);
      const id = args.id;
      return await deleteWorkout(id);
    },
    workoutUpdate: async (
      _: unknown,
      args: argsToUpdateWorkout,
      context: { req: { headers: { authorization: string } } },
    ): Promise<unknown> => {
      newContext(context);
      const id = args.input.id;
      const { sets, title, reps, backgroundImage, exercises } = args.input;
      const workout = { sets, title, reps, backgroundImage, exercises };
      return await updateWorkout(id, workout);
    },
  },
};
export default workoutresolvers;
