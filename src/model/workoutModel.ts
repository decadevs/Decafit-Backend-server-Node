import mongoose from 'mongoose';
import {excerciseSchema} from './excerciseModel'
interface ObjExcercise{
  [key:string]:  string | number | boolean
}

export interface WorkoutType extends mongoose.Document {
  _id:string;
  sets: number;
  title: string;
  reps:number;
  backgroundImage: string;
  exercises:  ObjExcercise[]
}

const workoutSchema = new mongoose.Schema({
  sets: { type: Number, default:0 },
  title: { type: String, unique: true },
  reps: { type: Number, default:0 },
  backgroundImage: { type: String },
  exercises:[{type: excerciseSchema}],
}, {
  timestamps: true,
});

export const Workout = mongoose.model<WorkoutType>('Workout', workoutSchema);