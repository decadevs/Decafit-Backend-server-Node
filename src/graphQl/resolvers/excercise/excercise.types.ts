enum baseType {
    time,
    reps,
  }
  
  export interface createExcerciseInput {
    title: string;
    description: string;
    // type: baseType;
    paused: boolean;
    pausedTime: string;
    completed: boolean;
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
    //   type: baseType;
      paused: boolean;
      pausedTime: string;
      completed: boolean;
    }
  export interface argsToUpdateExcercise {
    input: updateExcerciseInput;
  }