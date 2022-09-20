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
    createdAt: String
    message: String!
    token: String
  }
  
  type User {
    id: ID!
    fullName: String!
    phoneNumber: String!
    email: String!
    createdAt: String
  }

  type UserProfile {
    id: ID!
    fullName: String!
    email: String!
    phoneNumber: String!
    avatar:String!
    createdAt: String
  }

  input UserProfileInput {
    id: ID!
    avatar:String!
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


    enum EnumType{
      time
      count
    }
  
  type Excercise {
    id:ID!
    title: String!
    description: String!
    image:String!
    type:EnumType!
  }

  input ExcerciseInput {
    title: String!
    description: String!
    image:String!
    type:EnumType!
  }

  input UpdateExcerciseInput {
    id:ID
    title: String
    description: String
    image:String
    type:EnumType

  }

type WorkOut {
  id:ID!
  title: String!
  backgroundImage:String!
  sets: Int
  reps: Int
  exercises:[Excercise]
  createdAt:String
}

type ProgressExerciseInfo {
        type:EnumType
        paused: Boolean
        pausedTime: String
        completed: Boolean
}


input ReportExcerciseProgressInput{
  excerciseId:String
  type:EnumType
  paused: Boolean
  limit: String
  completed: Boolean
  progress: Int
}

input ReportCreateInput{
  userID:String!
  workouts:ReportWorkoutInput!
}

input ReportWorkoutInput{
  workoutId:String!
  workoutReps: Int!
  workoutSet: Int!
  workoutTime: String!
  workoutCount: Int!
  exercises:[ReportExcerciseProgressInput!]!
}

type ReportExcerciseProgress{
  excerciseId:String
  type:EnumType
  paused: Boolean
  limit: String
  completed: Boolean
  progress: Int
}

type ReportWorkout{
  workoutId:String!
  workoutReps: Int!
  workoutSet: Int!
  workoutTime: String!
  workoutCount: Int!
  exercises:[ReportExcerciseProgress!]!
}

type Report{
  userID: String!
  workouts: ReportWorkout
}

type Report2{
  userID: String!
  workouts: [ReportWorkout]
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
    reportWorkout(userID:String!, workoutID:String!):Report
    report(userID:String!):Report2
  }

  
  type Mutation {
    userRegister(user: RegisterInput): UserRegistration!
    userLogin(user: LoginInput): UserLogin!
    profileUpdate(user:UserProfileInput):UserProfile!
    workoutCreate(input:WorkoutInput):WorkOut!
    workoutUpdate(input:UpdateWorkoutInput):WorkOut!
    workoutDelete(id:ID!):deletedResponse!
    excerciseCreate(input:ExcerciseInput, workoutId:String!):Excercise!
    excerciseUpdate(input:UpdateExcerciseInput):Excercise!
    excerciseDelete(id:ID!):deletedResponse!
    reportCreate(input:ReportCreateInput):Report!
    reportUpdate(input:ReportCreateInput):Report!
    reportResetWorkout(userID: String!,workoutId:String!):WorkOut!
  }
`
export default typeDefs;

