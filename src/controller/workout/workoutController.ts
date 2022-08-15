import { Workout, WorkoutType } from '../../model/workoutModel';
import cloudinary from 'cloudinary';
import {createWorkoutInput,updateWorkoutInput} from './workout.interface'

export async function getAllWorkouts(): Promise<Array<WorkoutType>> {
  let data: Array<WorkoutType> = [];
  try {
    data = await Workout.find();
  } catch (err) {
    throw new Error('User not found');
  }
  return data;
}

export async function createWorkouts(input: createWorkoutInput): Promise<unknown> {
  try {
    //initialize cloudinary
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.v2.uploader.upload(input.backgroundImage, {
      // only jpg and png upload
      allowed_formats: ['jpg', 'png'],
      //generates a new id for each uploaded image
      public_id: '',
      /*folder where the images are stored in the cloud
       */
      folder: 'decafit_folder',
    });

    const newWorkout = {
        sets:input.sets,
        title: input.title,
        reps: input.reps,
        backgroundImage:result.url,
        exercises:input.exercises
    };
    const savedWorkout = await Workout.create(newWorkout);
    if (savedWorkout) {
      return savedWorkout;
    } else {
      throw new Error('Cannot create new workout');
    }
  } catch (err) {
    throw new Error(`${err}`);
  }
}

export async function deleteWorkout(id:string):Promise<unknown> {
    await Workout.findByIdAndDelete(id).exec();
   const response = {
    message:'Deleted sucessfully',
   }
  return response;
}

export async function  updateWorkout(id:string,workout:updateWorkoutInput):Promise<unknown> {
  try {
        //initialize cloudinary
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.v2.uploader.upload(workout.backgroundImage, {
      // only jpg and png upload
      allowed_formats: ['jpg', 'png'],
      //generates a new id for each uploaded image
      public_id: '',
      /*folder where the images are stored in the cloud
       */
      folder: 'decafit_folder',
    });

    const newWorkout = {
        sets:workout.sets,
        title: workout.title,
        reps: workout.reps,
        backgroundImage:result.url,
        exercises:workout.exercises,
    };
      const updatedNew = await Workout.findByIdAndUpdate(id,newWorkout,{new:true})
      if (updatedNew){
          return updatedNew
      } else {
          throw new Error('Cannot update workout')
      }
  } catch (err){
    throw new Error(`${err}`);
   }
}

export async function getWorkoutById(id: string): Promise<WorkoutType> {
  let workout: WorkoutType;
  try {
    workout = (await Workout.findById(id)) || ({} as WorkoutType);
  } catch (error) {
    throw new Error('Internal server Error');
  }
  return  workout;
}
