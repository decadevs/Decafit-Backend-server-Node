import userResolvers from './user/users';
import workoutresolvers from './workout/workout';
import excerciseresolvers from './excercise/excercise'

export default {
    Query: {
      ...userResolvers.Query,
      ...workoutresolvers.Query,
      ...excerciseresolvers.Query
    },
  Mutation: {
    ...userResolvers.Mutation,
    ...workoutresolvers.Mutation,
    ...excerciseresolvers.Mutation
  },
};
