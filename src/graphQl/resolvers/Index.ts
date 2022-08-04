import userresolvers from './Users';

export default {
    Query: {
      ...userresolvers.Query
    },
  Mutation: {
    ...userresolvers.Mutation,
  },
};
