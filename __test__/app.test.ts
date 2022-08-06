import typeDefs from '../src/graphQl/typeDefs'
import resolvers from '../src/graphQl/resolvers/Index'
import {ApolloServer, gql} from 'apollo-server-express';

const apolloServer = new ApolloServer({
    cache: 'bounded',
    typeDefs,
    resolvers,
    context:({req, res})=>({req, res})
  })

it('User should be able to register', async()=>{
    const result = await apolloServer.executeOperation({
        query:gql`
         mutation {
            register(user:{ 
            fullName: "Damilola Babalola",
            email: "dammydeji.dd@gmail.com",
            phoneNumber: "07066848884",
            password: "12345678",
            })
         }
        `
    })
    expect(result).toBeTruthy 
    expect(result.errors).toBeTruthy 
})

test('Users should be able to login', async()=>{
    const result = await apolloServer.executeOperation({
        query:gql`
        mutation {
           login(user:{ 
           email: "dammydeji.dd@gmail.com",
           password: "12345678",
           })
        }
       ` 
    })
    expect(result).toBeTruthy 
    expect(result).toHaveProperty('data');
})