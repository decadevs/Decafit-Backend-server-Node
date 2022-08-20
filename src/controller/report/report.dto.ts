import { IReport, IReportWorkoutProps, ReportWorkoutExcercise } from '../../graphQl/resolvers/report/report.types';
import { IExerciseResponse } from './report.interface';

export class ReportDTO{

    static get(input: any): IReport{
        const workoutId =  Object.keys(input.workouts)[0];
        const userID = input.userID;
        const workouts= ReportDTO.getWorkouts(input, workoutId);
        return {userID, workouts};
    }

    static getByWorkoutID(input:any, _workoutId:string): IReport{
        const workoutId =  input.workouts[_workoutId];
        const userID = input.userID;
        const workouts= ReportDTO.getWorkouts(input, workoutId);
        return {userID, workouts};
    }

    // static getReports(input: any): IReport{
    //     const _workouts =  Object.keys(input.workouts);
    //     const userID = input.userID;
    //     const workouts= ReportDTO.getReportsWorkout(input, _workouts);
    //     return {userID, workouts};
    // }

    static getWorkouts(input:any, workoutId:string): IReportWorkoutProps{
        return {
            workoutId:  workoutId,
            workoutReps: input.workoutProps[workoutId].workoutReps,
            workoutSet: input.workoutProps[workoutId].workoutSet,
            workoutTime: input.workoutProps[workoutId].workoutTime,
            workoutCount: input.workoutProps[workoutId].workoutCount,
            exercises: ReportDTO.convertData(input.workouts[workoutId])
        };
    }

    static getReportsWorkout(input:any, workoutId:string): IReportWorkoutProps{
        return {
            workoutId:  workoutId,
            workoutReps: input.workoutProps[workoutId].workoutReps,
            workoutSet: input.workoutProps[workoutId].workoutSet,
            workoutTime: input.workoutProps[workoutId].workoutTime,
            workoutCount: input.workoutProps[workoutId].workoutCount,
            exercises: ReportDTO.convertData(input.workouts[workoutId])
        };
    }

    static convertData(data:IExerciseResponse ):ReportWorkoutExcercise[]{
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
