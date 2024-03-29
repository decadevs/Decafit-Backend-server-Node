import { IReport, IReportWorkout, ReportWorkoutExcercise } from '../../graphQl/resolvers/report/report.types'
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
        workoutName: input.workouts.workoutName,
        workoutReps: input.workouts.workoutReps,
        workoutSet: input.workouts.workoutSet,
        workoutTime: input.workouts.workoutTime,
        workoutCount: input.workouts.workoutCount
      }
    }
 }
}

function addTimeStamp(data: any, report: ReportType | null) {
  if (report) { 
    data.createdAt = report.createdAt;
    data.updatedAt = report.updatedAt;
  }
  return data;
}

export async function createReport(input:IReport):Promise<IReport>{
   
   const data = getWorkout(input);
   const report = await getReportByUserId(input.userID)
   let savedReport;
   if (report) {
    const _data: any = {...data};
    _data.workouts = { ...report.workouts, ..._data.workouts}
    _data.workoutProps = { ...report.workoutProps, ..._data.workoutProps}
    console.log('update', _data)
    savedReport = await Report.findOneAndUpdate({userID:report.userID},_data,{new:true})
    // savedReport.createdAt = Date.now();
    console.log('update', savedReport);
   } else {
     savedReport = await Report.create(data)
    //  console.log('create', data);
   }
  const response =  ReportDTO.get(savedReport)
   
   return addTimeStamp(response, savedReport);
}

 async function getReportByUserId(userID:string):Promise<ReportType | null>{
    try {
      const report =Report.findOne({userID});
      if (report){
        return report
      }
      throw Error('Report not found')
    } catch (error) {
      throw new Error('Internal server Error');
    }
}
export async function getReport(userID:string):Promise<IReportWorkout>{
    try {
        const report = await getReportByUserId(userID)
    if (report){
       return addTimeStamp(ReportDTO.getWorkoutsByUserId(report), report);
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
       return addTimeStamp(res, report);
    }
     throw Error('Report not found')
    
    } catch (error) {
      throw new Error('Internal server Error');
    }
}