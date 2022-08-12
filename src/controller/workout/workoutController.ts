import { Workout, WorkoutType } from '../../model/workoutModel';
import cloudinary from 'cloudinary';
import { ObjectId } from 'mongoose';
interface Exercises {
    [key:string]: string | number | boolean;
  }
interface createWorkoutInput {
  sets: string;
  title: string;
  reps: string;
  backgroundImage: string;
  exercises:Exercises[]
}

export async function getAllWorkouts(): Promise<Array<WorkoutType>> {
  let data: Array<WorkoutType> = [];
  try {
    data = await Workout.find();
  } catch (err) {
    throw new Error('User not found');
  }
  return data;
}

interface newUser{
    _id:ObjectId
}

export async function createWorkouts(input: createWorkoutInput, user:newUser): Promise<unknown> {
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
        exercises:input.exercises,
        user: user._id,
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
       msg:'Deleted sucessfully',
   }
  return response;
}
