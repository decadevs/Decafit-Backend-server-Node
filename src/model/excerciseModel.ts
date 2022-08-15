import mongoose from 'mongoose';
// import {typesEnum} from './typesEnum'
//import _ from 'lodash';

export interface ExerciseType extends mongoose.Document {
    title: string;
    image: string;
    description: string;
    type: string;
    paused: boolean;
    pausedTime: string;
    completed: boolean
}

export const excerciseSchema = new mongoose.Schema({
    title: { type: String },
    image: { type: String },
    description: { type: String },
    // type: { type: String,  enum: _.values(typesEnum)},
    paused: { type: Boolean ,default: false},
    pausedTime: { type: String, default:''},
    completed: { type: Boolean ,default: false},
}, {
  timestamps: true,
});

export const Excercise = mongoose.model<ExerciseType>('Excercise', excerciseSchema);