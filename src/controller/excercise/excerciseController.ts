import {  Excercise, ExerciseType} from '../../model/excerciseModel';
enum baseType {
    time,
    reps
}

interface createExcerciseInput {
    title: string,
    description: string,
    type: baseType,
    paused: boolean,
    pausedTime: string,
    completed: boolean
}

export async function getAllExercises(): Promise<Array<ExerciseType>> {
  let data: Array<ExerciseType> = [];
  try {
    data = await Excercise.find();
  } catch (err) {
    throw new Error('User not found');
  }
  return data;
}

export async function createExcercise(input: createExcerciseInput): Promise<unknown> {
  try {
   
        const newExcercise = new Excercise({
        title: input.title,
        description: input.description,
        type: input.type,
        paused: input.paused,
        pausedTime: input.pausedTime,
        completed:input.completed,
        createdAt: new Date().toISOString(),
      });
     
    const savedExcercise = await Excercise.create(newExcercise);
    if (savedExcercise) {
      return  savedExcercise;
    } else {
      throw new Error('Cannot create new exercise');
    }
  } catch (err) {
    throw new Error(`${err}`);
  }
}