import {gql} from 'apollo-server-express'

const typeDefs = gql`

 type UserReg{
     id:ID!
     fullName:String!
     phoneNumber:String!
     email:String!
     message:String!
     createdAt:String!
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

input WorkoutInput{
  sets: Int!
  title: String!
  totalCalories: Int!
  reps: Int!
  backgroundImage:String!

}

input VerifyInput{
  token:String!
}

type WorkOut {
  id:ID!
  sets: Int!
  title: String!
  totalCalories: Int!
  reps: Int!
  backgroundImage:String!
  createdAt:String!
}

type deletedResponse{
     msg:String!
 }


type WorkOutCreated {
  id:ID!
  sets: Int!
  title: String!
  totalCalories: Int!
  reps: Int!
  backgroundImage:String!
  createdAt:String!
}

type Query{
    users:[User]!
    user(id:ID!): User!
    workouts:[WorkOut]!
}

 type Mutation{
     register(user:RegisterInput):UserReg!
     verify(user:VerifyInput):Token!
     login(email:String!, password:String!):UserLogin!
     createWorkout(input:WorkoutInput):WorkOut!
     deleteWorkout(id:ID!):deletedResponse!
 }
`
export default typeDefs;