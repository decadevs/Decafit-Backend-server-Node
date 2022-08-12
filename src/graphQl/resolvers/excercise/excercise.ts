import {createExcercise,getAllExercises} from '../../../controller/excercise/excerciseController'
import {newContext} from '../../../middlewares/check-auth'
enum baseType {
    time,
    reps
}

interface createExcerciseInput{
    title: string,
    description: string,
    type: baseType,
    paused: boolean,
    pausedTime: string,
    completed: boolean
}

interface argsForCreateExcercise{
    input:createExcerciseInput
}

interface argsForExcercise{
    user:createExcerciseInput
}

const excerciseresolvers = {
    Query:{
        excercises:async (_:unknown, args:argsForExcercise,
            context:{ req: { headers: { authorization: string; }; }; }):Promise<unknown>=>{
            newContext(context)
            const res = await getAllExercises()
             return res
        },
        
    },
    Mutation :{
         async  createExcercise(_:unknown, args:argsForCreateExcercise, 
            context:{ req: { headers: { authorization: string; }; }; }):Promise<unknown>{
                newContext(context);
            return await createExcercise(args.input)
         },
     }
 }
export default excerciseresolvers