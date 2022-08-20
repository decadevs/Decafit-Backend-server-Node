import userResolvers from './user/users';
import workoutresolvers from './workout/workout';
import excerciseresolvers from './excercise/excercise'
import reportResolver  from './report/report'
export default {
    Query: {
      ...userResolvers.Query,
      ...workoutresolvers.Query,
      ...excerciseresolvers.Query,
      ...reportResolver.Query
    },
  Mutation: {
    ...userResolvers.Mutation,
    ...workoutresolvers.Mutation,
    ...excerciseresolvers.Mutation,
    ...reportResolver.Mutation
  },
};
