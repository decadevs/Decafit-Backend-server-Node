export interface createExcerciseInput {
    title: string,
    description: string,
    paused: boolean,
    pausedTime: string,
    completed: boolean
}

export interface updateExcerciseInput {
  title: string,
  description: string,
  paused: boolean,
  pausedTime: string,
  completed: boolean
}