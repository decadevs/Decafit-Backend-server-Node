import { ObjectId } from 'mongoose'

interface Exercises {
    [key:string]: string | number | boolean;
  }
export interface createWorkoutInput {
  sets: string;
  title: string;
  reps: string;
  backgroundImage: string;
  exercises:Exercises[]
}

export interface updateWorkoutInput {
  sets: string;
  title: string;
  reps: string;
  backgroundImage: string;
  exercises:Exercises[]
}

export interface ObjectInterface{
    _id: ObjectId,
    sets: number,
    title: string,
    reps: number,
    backgroundImage: string,
    exercises: Exercises[],
}