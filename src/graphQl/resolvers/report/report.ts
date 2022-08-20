import {IReportCreateInput} from './report.types'
import {createReport, getReport,getReportByUserIDAndWorkoutID} from '../../../controller/report/reportController'
import { newContext } from '../../../middlewares/check-auth';

const reportResolver = {
    Query:{
        report: async (
            _: unknown,
            args:any,
            context: { req: { headers: { authorization: string } } },
          ): Promise<unknown> => {
            newContext(context);
            const res = await getReport(args.userID);
            return res;
          },
          reportWorkout:async (
            _: unknown,
            args:any,
            context: { req: { headers: { authorization: string } } },
          ): Promise<unknown> => {
            newContext(context);
            const res = await getReportByUserIDAndWorkoutID(args.userID, args.workoutID);
            return res;
          },
    },
    Mutation:{
        async reportCreate(_:unknown, args:IReportCreateInput,  
            context: { req: { headers: { authorization: string } } }):Promise<unknown>{
                newContext(context);
                return createReport(args.input)
        }
    }
}

export default  reportResolver