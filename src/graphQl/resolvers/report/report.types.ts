export interface ReportWorkoutExcercise {
  excerciseId: string;
  type: string;
  paused: boolean;
  limit: string;
  completed: boolean;
  progress: number;
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

export interface IReportWorkoutsProps2 {
  workoutId: string;
  workoutReps: string;
  workoutSet: number;
  workoutTime: string;
  workoutCount: number;
  exercises: ReportWorkoutExcercise[];
}

export interface IReportWorkoutProps extends IReportWorkoutSubProps{
  exercises: ReportWorkoutExcercise[];
}

export interface IReportWorkout{
  userID: string;
  workouts: IReportWorkoutsProps2[];
}
export interface IReport {
  userID: string;
  workouts: IReportWorkoutProps;
}

export interface IReports {
  userID: string;
  workouts: IReportWorkoutProps[];
}
