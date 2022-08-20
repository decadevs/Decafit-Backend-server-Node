export interface ReportWorkoutExcercise {
  excerciseId: string;
  type: string;
  paused: boolean;
  pausedTime: string;
  completed: boolean;
}
export interface IReportCreateInput {
  input: IReport;
}

export interface IReport {
  userID: string;
  workouts: {
    workoutId: string;
    exercises: [ReportWorkoutExcercise];
  };
}
