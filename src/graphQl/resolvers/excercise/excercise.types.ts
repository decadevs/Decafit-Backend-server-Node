
  export interface createExcerciseInput {
    title: string;
    description: string;
    image:string
  }
  
  export interface argsForCreateExcercise {
    input: createExcerciseInput;
    workoutId:string
  }
  
  export interface argsForExcercise {
    user: createExcerciseInput;
  }
  
  export interface updateExcerciseInput {
      id:string,
      title: string;
      description: string;
      image:string
    }
  export interface argsToUpdateExcercise {
    input: updateExcerciseInput;
  }