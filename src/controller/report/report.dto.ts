import { IReport, IReportWorkout, IReportWorkoutProps, ReportWorkoutExcercise } 
from '../../graphQl/resolvers/report/report.types';
import { IExerciseResponse } from './report.interface';

export class ReportDTO{

    static get(input: any): IReport{
        const workoutId =  Object.keys(input.workouts)[0];
        const userID = input.userID;
        const workouts= ReportDTO.getWorkouts(input, workoutId);
        return {userID, workouts};
    }

    static getByWorkoutID(input:any, _workoutId:string): IReport{
        const userID = input.userID;
        const workouts= ReportDTO.getReportsWorkout(input, _workoutId);
        return {userID, workouts};
    }

    static getWorkoutsByUserId(input:any): IReportWorkout{
        const data = Object.entries(input.workouts).map( ([workoutId, value]) => {
            const props = input.workoutProps[workoutId];
            return {
                workoutId,
                workoutName: props.workoutName,
                workoutReps: props.workoutReps,
                workoutSet: props.workoutSet,
                workoutTime: props.workoutTime,
                workoutCount: props.workoutCount,
                exercises: Object.values(value as any) as ReportWorkoutExcercise[]
            }
        });
        return { userID: input.userID, workouts: data}
    }

    static getWorkouts(input:any, workoutId:string): IReportWorkoutProps{
        return {
            workoutId:  workoutId,
            workoutName:  input.workoutProps[workoutId].workoutName,
            workoutReps: input.workoutProps[workoutId].workoutReps,
            workoutSet: input.workoutProps[workoutId].workoutSet,
            workoutTime: input.workoutProps[workoutId].workoutTime,
            workoutCount: input.workoutProps[workoutId].workoutCount,
            exercises: ReportDTO.convertData2(input.workouts[workoutId])
        };
    }

    static getReportsWorkout(input:any, workoutId:string): IReportWorkoutProps{
        return {
            workoutId:  workoutId,
            workoutName:  input.workoutProps[workoutId].workoutName,
            workoutReps: input.workoutProps[workoutId].workoutReps,
            workoutSet: input.workoutProps[workoutId].workoutSet,
            workoutTime: input.workoutProps[workoutId].workoutTime,
            workoutCount: input.workoutProps[workoutId].workoutCount,    
            exercises: ReportDTO.convertData2(input.workouts[workoutId])
        };
    }

    static convertData(data:IExerciseResponse ):ReportWorkoutExcercise[]{
        return Object.entries(data).map(([key,value])=>{
         return {
            excerciseId: key,
            type: value.type,
            paused: value.paused,
            limit: value.limit,
            completed: value.completed,
            progress: value.progress,
         }
        })
    }

    static convertData2(data:IExerciseResponse ):ReportWorkoutExcercise[]{
        return Object.values(data);
    }
}
