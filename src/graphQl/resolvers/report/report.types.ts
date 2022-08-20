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

export interface IReportWorkoutSubProps {
  workoutId: string;
  workoutReps: string;
  workoutSet: number;
  workoutTime: string;
  workoutCount: number;
}
export interface IReportWorkoutProps extends IReportWorkoutSubProps{
  exercises: ReportWorkoutExcercise[];
}
export interface IReport {
  userID: string;
  workouts: IReportWorkoutProps;
}

export interface IReports {
  userID: string;
  workouts: IReportWorkoutProps[];
}
