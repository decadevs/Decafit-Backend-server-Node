import { IReport, ReportWorkoutExcercise } from '../../graphQl/resolvers/report/report.types';
import { ExcerciseResponse } from './report.interface';

export class ReportDTO implements IReport{
    userID
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    workouts:any
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(input:any){
        const workoutId =  Object.keys(input.workouts)[0];
        this.userID = input.userID;
        this.workouts= {
          workoutId:  workoutId,
          exercises: this.convertData(input.workouts[workoutId])
        };
    }
    convertData(data:ExcerciseResponse ):ReportWorkoutExcercise[]{
        return Object.entries(data).map(([key,value])=>{
         return {
        excerciseId: key,
        type: value.type,
        paused: value.paused,
        pausedTime: value.pausedTime,
        completed: value.completed
         }
        })
    }
}
