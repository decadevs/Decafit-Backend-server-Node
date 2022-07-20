import userresolvers from './Users';

export const indexresolver = {
    Query: {
      ...userresolvers.Query
    },
  Mutation: {
    ...userresolvers.Mutation,
  },
};
