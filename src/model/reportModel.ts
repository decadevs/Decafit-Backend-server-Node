import mongoose from 'mongoose';
interface IWorkout {
  workoutId: {
    exerciseId: {
        exerciseId: string;
        progress: number;
        type:string;
        paused: boolean;
        limit: string;
        completed: boolean;
    };
  };
}

interface IWorkoutProps {
  workoutId: {
    workoutReps: number;
    workoutSet: number;
    workoutTime: string;
    workoutCount: number;
  }
}
export interface ReportType extends mongoose.Document {
  _id: string;
  userID: string;
  workouts: IWorkout;
  workoutProps: IWorkoutProps;
}

export const reportSchema = new mongoose.Schema(
  {
    userID:  {type: String, required:true, unique:true},
    workouts:  {type: mongoose.Schema.Types.Mixed},
    workoutProps:  {type: mongoose.Schema.Types.Mixed},
  },
  {
    timestamps: true,
  },
);

export const Report = mongoose.model<ReportType>('Report', reportSchema);
