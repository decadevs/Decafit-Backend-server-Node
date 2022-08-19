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
  title: String!
  backgroundImage:String!
  reps: Int
  sets: Int
  }


  input UpdateWorkoutInput{
    id:ID!
    sets: Int
    title: String
    reps: Int
    backgroundImage:String
    }
  
  type Excercise {
    id:ID!
    title: String!,
    description: String!
    image:String!
  }

  input ExcerciseInput {
    title: String!,
    description: String!
    image:String!
  }

  input UpdateExcerciseInput {
    id:ID
    title: String,
    description: String,
    image:String
  }


type WorkOut {
  id:ID!
  title: String!
  backgroundImage:String!
  sets: Int
  reps: Int
  exercises:[Excercise]
  createdAt:String!
}

type deletedResponse{
     message:String!
 }
  
  type Query {
    users: [User]!
    user(id: ID!): User!
    workouts:[WorkOut]!
    workout(id: ID!): WorkOut!
    excercises:[Excercise]!
    excercise(id: ID!):Excercise!
  }
  
  type Mutation {
    register(user: RegisterInput): UserRegistration!
    login(user: LoginInput): UserLogin!
    createWorkout(input:WorkoutInput):WorkOut!
    updateWorkout(input:UpdateWorkoutInput):WorkOut!
    deleteWorkout(id:ID!):deletedResponse!
    createExcercise(input:ExcerciseInput, workoutId:String!):Excercise!
    updateExcercise(input:UpdateExcerciseInput):Excercise!
    deleteExcercise(id:ID!):deletedResponse!
  }
`
// eslint-disable-next-line no-undef
export default typeDefs;
