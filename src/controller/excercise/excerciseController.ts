import {  Excercise, ExerciseType} from '../../model/excerciseModel';
import {createExcerciseInput, updateExcerciseInput} from './excercise.interface'
import {getWorkoutById} from '../workout/workoutController'

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
        const newExcercise = new Excercise({
        title: input.title,
        description: input.description,
        paused: input.paused,
        pausedTime: input.pausedTime,
        completed:input.completed,
        createdAt: new Date().toISOString(),
      });
     
    const savedExcercise = await Excercise.create(newExcercise)
    if (savedExcercise) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const workout:any = await getWorkoutById(workoutId)
      console.log(workout)
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

export async function  updateExcercise(id:string,excercise:updateExcerciseInput):Promise<unknown> {
  try {
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
