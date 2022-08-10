import mongoose from 'mongoose';
interface Exercises {
    [key:string]: string | number;
  }
export interface WorkoutType extends mongoose.Document {
  _id:string
  sets: number,
  title: string,
  reps:number,
  backgroundImage: string,
  exercises: Exercises[]
}

const workoutSchema = new mongoose.Schema({
  sets: { type: Number, },
  title: { type: String, unique: true },
  reps: { type: Number },
  backgroundImage: { type: String },
  exercises:{ type : Array , 'default' : [] },
  user:{type: mongoose.Schema.Types.ObjectId,ref:'User'}
}, {
  timestamps: true,
});

export const Workout = mongoose.model<WorkoutType>('Workout', workoutSchema);