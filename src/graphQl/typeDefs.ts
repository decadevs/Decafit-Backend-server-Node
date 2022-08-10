const typeDefs = `

type UserRegistration {
    id: ID!
    fullName: String!
    email: String!
    phoneNumber: String!
    message: String!
  }
  
  type UserLogin {
    id: ID!
    fullName: String!
    email: String!
    phoneNumber: String!
    createdAt: String!
    message: String!
    token: String!
  }
  
  type User {
    id: ID!
    fullName: String!
    phoneNumber: String!
    email: String!
    createdAt: String!
  }
  
  input RegisterInput {
    fullName: String!
    email: String!
    phoneNumber: String!
    password: String!
  }
  
  input LoginInput {
    email: String!
    password: String!
  }

  input WorkoutInput{
  sets: Int!
  title: String!
  reps: Int!
  backgroundImage:String!
  }

type WorkOut {
  id:ID!
  sets: Int!
  title: String!
  reps: Int!
  backgroundImage:String!
  createdAt:String!
}

type deletedResponse{
     message:String!
 }
  
  type Query {
    users: [User]!
    user(id: ID!): User!
    workouts:[WorkOut]!
  }
  
  type Mutation {
    register(user: RegisterInput): UserRegistration!
    login(user: LoginInput): UserLogin!
    createWorkout(input:WorkoutInput):WorkOut!
    deleteWorkout(id:ID!):deletedResponse!
  }
`
// eslint-disable-next-line no-undef
export default typeDefs;
