import {  Excercise, ExerciseType} from '../../model/excerciseModel';
import {createExcerciseInput, updateExcerciseInput} from './excercise.interface'
import {getWorkoutById} from '../workout/workoutController'

import cloudinary from 'cloudinary';

export async function getAllExercises(): Promise<Array<ExerciseType>> {
  let data: Array<ExerciseType> = [];
  try {
    data = await Excercise.find();
  } catch (err) {
    throw new Error('User not found');
  }
  return data;
}

export async function createExcercise(input: createExcerciseInput, workoutId:string): Promise<unknown> {
  try {
      //initialize cloudinary
      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
  
      const result = await cloudinary.v2.uploader.upload(input.image, {
        // only jpg and png upload
        allowed_formats: ['jpg', 'png'],
        //generates a new id for each uploaded image
        public_id: '',
        /*folder where the images are stored in the cloud
         */
        folder: 'decafit_folder',
      });
  
      if (!result){
       throw new Error('Image is not a valid format only jpg and png is allowed')
      }
        const newExcercise = new Excercise({
        title: input.title,
        description: input.description,
        image:result.url,
        type:input.type,
        createdAt: new Date().toISOString(),
      });
     
    const savedExcercise = await Excercise.create(newExcercise)
    if (savedExcercise) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const workout:any = await getWorkoutById(workoutId)

      workout.exercises.push(savedExcercise)
      workout.save();
      return  savedExcercise;
    } else {
      throw new Error('Cannot create new exercise');
    }
  } catch (err) {
    throw new Error(`${err}`);
  }
}

export async function deleteExcercise(id:string):Promise<unknown> {
  await  Excercise.findByIdAndDelete(id).exec();
 const response = {
  message:'Deleted sucessfully',
 }
return response;
}

export async function  updateExcercise(id:string,input:updateExcerciseInput):Promise<unknown> {
  try {
       //initialize cloudinary
       cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
  
      const result = await cloudinary.v2.uploader.upload(input.image, {
        // only jpg and png upload
        allowed_formats: ['jpg', 'png'],
        //generates a new id for each uploaded image
        public_id: '',
        /*folder where the images are stored in the cloud
         */
        folder: 'decafit_folder',
      });
  
      if (!result){
       throw new Error('Image is not a valid format only jpg and png is allowed')
      }
        const excercise = new Excercise({
        title: input.title,
        description: input.description,
        image:result.url,
        type:input.type,
        createdAt: new Date().toISOString(),
      });
     
      const updatedNew = await Excercise.findByIdAndUpdate(id,excercise,{new:true})
      if (updatedNew){
          return updatedNew
      } else {
          throw new Error('Cannot update excercise')
      }
  } catch (err){
    throw new Error(`${err}`);
   }
}

export async function getExcerciseById(id: string): Promise<ExerciseType> {
  let excercise: ExerciseType;
  try {
    excercise = (await Excercise.findById(id)) || ({} as ExerciseType);
  } catch (error) {
    throw new Error('Internal server Error');
  }
  return excercise;
}
