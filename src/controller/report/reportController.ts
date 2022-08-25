import { IReport, ReportWorkoutExcercise } from '../../graphQl/resolvers/report/report.types'
import { Report, ReportType } from '../../model/reportModel'
import { ReportDTO } from './report.dto'

const getExcercise = (excercises:ReportWorkoutExcercise[])=>{
    return  excercises.reduce((acc,elem)=>{
       
       return {...acc,[elem.excerciseId]:{
           excerciseId: elem.excerciseId,
           type:elem.type,
           paused: elem.paused,
           limit: elem.limit,
           progress: elem.progress,
          completed: elem.completed
       }
      }
    },{})
  }

function getWorkout(input: IReport){
  return {
    userID:input.userID,
    workouts:{
        [input.workouts.workoutId]:getExcercise(input.workouts.exercises),
    },
    workoutProps: {
      [input.workouts.workoutId]: {
        workoutReps: input.workouts.workoutReps,
        workoutSet: input.workouts.workoutSet,
        workoutTime: input.workouts.workoutTime,
        workoutCount: input.workouts.workoutCount
      }
    }
 }
}

export async function createReport(input:IReport):Promise<IReport>{
   
   const data = getWorkout(input);
   const report = await getReportByUserId(input.userID)
   let savedReport;
   if (report) {
    data.workouts = { ...report.workouts,...data.workouts}
    savedReport = await Report.findOneAndUpdate({userID:report.userID},data,{new:true})
   } else {
     savedReport = await Report.create(data)
   }
  const response =  ReportDTO.get(savedReport)
   return response
}

 async function getReportByUserId(userID:string):Promise<ReportType | null>{
    try {
    return  Report.findOne({userID});
    } catch (error) {
      throw new Error('Internal server Error');
    }
}
export async function getReport(userID:string):Promise<unknown>{
    try {
        const report = await getReportByUserId(userID)
    if (report){
       return ReportDTO.get(report)

    }
    throw new Error('Report not found')
    } catch (err) {
      throw new Error('Internal server Error')
    }
}

export async function getReportByUserIDAndWorkoutID(userID:string, workoutID:string):Promise<IReport | null>{
    try {
     const report = await getReportByUserId(userID)
     if (report){
       const res = ReportDTO.getByWorkoutID(report, workoutID);
       return res;
    }
     throw Error('Report not found')
    
    } catch (error) {
      throw new Error('Internal server Error');
    }
}