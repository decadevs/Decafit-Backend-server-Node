import mongoose from 'mongoose';

export interface WorkoutType extends mongoose.Document {
  _id:string;
  sets: number;
  title: string;
  reps:number;
  backgroundImage: string;
  exercises: []
}

const workoutSchema = new mongoose.Schema({
  sets: { type: Number },
  title: { type: String, unique: true },
  reps: { type: Number },
  backgroundImage: { type: String },
  exercises:[{type: mongoose.Schema.Types.ObjectId, ref:'Excercise'}],
}, {
  timestamps: true,
});

export const Workout = mongoose.model<WorkoutType>('Workout', workoutSchema);