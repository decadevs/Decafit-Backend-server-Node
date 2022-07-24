import {gql} from 'apollo-server-express'

const typeDefs = gql`

 type UserReg{
     id:ID!
     fullName:String!
     email:String!
     createdAt:String!
 }

 type UserLogin{
     id:ID!
     fullName:String!
     email:String!
     createdAt:String!
     message:String!
     token:String!
 }

 type User{
     id:ID!
     fullName:String!
     phoneNumber: String!
     email:String!
     createdAt:String!
 }

 type Token{
  token:String!
  message:String!
  verified:Boolean!
 }

 input RegisterInput{
  fullName: String!
  email: String!
  phoneNumber: String!
  password: String!
 }

input VerifyInput{
  token:String!
}

type Query{
    users:[User]!
    userById: User!
}

 type Mutation{
     register(user:RegisterInput):User!
     verify(user:VerifyInput):Token!
     login(email:String!, password:String!):UserLogin!
 }
`
export default typeDefs;