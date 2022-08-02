import userresolvers from './Users';
import workoutresolvers from './workout';

export const indexresolver = {
    Query: {
      ...userresolvers.Query,
      ...workoutresolvers.Query
    },
  Mutation: {
    ...userresolvers.Mutation,
    ...workoutresolvers.Mutation
  },
};
