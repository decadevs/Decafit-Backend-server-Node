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

 type AllUsers{
     id:ID!
     fullName:String!
     phoneNumber: String!
     email:String!
     createdAt:String!
 }

 type Token{
  token:String!
  message:String!
  active:Boolean!
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
    getAllUsersFromDb:[AllUsers]!
    getUserByIdFromDb: AllUsers!
}

 type Mutation{
     register(user:RegisterInput):UserReg!
     verify(user:VerifyInput):Token!
     login(email:String!, password:String!):UserLogin!
 }
`
export default typeDefs;