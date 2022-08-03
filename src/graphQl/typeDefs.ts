import {gql} from 'apollo-server-express'

const typeDefs = gql`

 type UserRegistration{
     id:ID!
     fullName:String!
     email:String!
     phoneNumber: String!
     message:String!
 }
 

 type UserLogin{
     id:ID!
     fullName:String!
     email:String!
     phoneNumber: String!
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

 input RegisterInput{
  fullName: String!
  email: String!
  phoneNumber: String!
  password: String!
 }

 input LoginInput{
  email:String! 
  password:String!
 }

type Query{
  users:[User]!
    user(id:ID!): User!
}

 type Mutation{
     register(user: RegisterInput): UserRegistration!
     login(user: LoginInput): UserLogin!
 }
`
export default typeDefs;