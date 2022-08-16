import mongoose from 'mongoose';
import {typesEnum} from './typesEnum'
import _ from 'lodash';

export interface ExerciseType extends mongoose.Document {
    _id:string;
    title: string;
    image: string;
    description: string;
    type: string;
    paused: boolean;
    pausedTime: string;
    completed: boolean
}

const excerciseSchema = new mongoose.Schema({
    title: { type: String },
    image: { type: String },
    description: { type: String },
    type: { type: String,  enum: _.values(typesEnum)},
    paused: { type: Boolean },
    pausedTime: { type: String },
    completed: { type: Boolean },
    // workout:{type: mongoose.Schema.Types.ObjectId,ref:'Workout'}
}, {
  timestamps: true,
});

export const Excercise = mongoose.model<ExerciseType>('Excercise', excerciseSchema);