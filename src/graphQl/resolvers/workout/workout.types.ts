interface Exercises {
    [key: string]: string | number;
  }
  export interface createWorkoutInput {
    sets: string;
    title: string;
    reps: string;
    backgroundImage: string;
    exercises: Exercises[];
  }
  
  export interface updateWorkoutInput {
    id: string;
    sets: string;
    title: string;
    reps: string;
    backgroundImage: string;
    exercises: Exercises[];
  }
  
  export interface argsForCreateWorkout {
    input: createWorkoutInput;
  }
  export interface argsToUpdateWorkout {
    input: updateWorkoutInput;
  }
  
  export interface argsForWorkout {
    user: createWorkoutInput;
  }
  