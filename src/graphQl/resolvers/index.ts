import userResolvers from './user/users';
import workoutresolvers from './workout/workout';

export default {
    Query: {
      ...userResolvers.Query,
      ...workoutresolvers.Query
    },
  Mutation: {
    ...userResolvers.Mutation,
    ...workoutresolvers.Mutation
  },
};
