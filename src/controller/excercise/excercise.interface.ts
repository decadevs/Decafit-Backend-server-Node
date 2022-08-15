// enum baseType {
//     time,
//     reps
// }

export interface createExcerciseInput {
    title: string,
    description: string,
    // type: baseType,
    paused: boolean,
    pausedTime: string,
    completed: boolean
}

export interface updateExcerciseInput {
  title: string,
  description: string,
//   type: baseType,
  paused: boolean,
  pausedTime: string,
  completed: boolean
}