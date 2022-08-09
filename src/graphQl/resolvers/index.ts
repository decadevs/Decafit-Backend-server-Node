import userResolvers from './user/users';

export default {
    Query: {
      ...userResolvers.Query
    },
  Mutation: {
    ...userResolvers.Mutation,
  },
};
