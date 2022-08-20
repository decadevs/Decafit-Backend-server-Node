import mongoose from 'mongoose';
interface IWorkout {
  workoutId: {
    exerciseId: {
        type:string;
        paused: boolean;
        pausedTime: string;
        completed: boolean;
    };
  };
}

export interface ReportType extends mongoose.Document {
  _id: string;
  userID: string;
  workouts: IWorkout;
}

export const reportSchema = new mongoose.Schema(
  {
    userID:  {type: String, required:true, unique:true},
    workouts:  {type: mongoose.Schema.Types.Mixed}
  },
  {
    timestamps: true,
  },
);

export const Report = mongoose.model<ReportType>('Report', reportSchema);
