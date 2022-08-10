import {getAllWorkouts,createWorkouts,deleteWorkout} from '../../../controller/workout/workoutController'
import {newContext} from '../../../middlewares/check-auth'
interface Exercises {
    [key:string]: string | number;
  }
interface createWorkoutInput{
  sets: string
  title: string
  reps: string
  backgroundImage:string
  exercises:Exercises[]
}

interface argsForCreateWorkout{
    input:createWorkoutInput
}

interface argsForWorkout{
    user:createWorkoutInput
}

const workoutresolvers = {
    Query:{
        workouts:async (_:unknown, args:argsForWorkout,
            context:{ req: { headers: { authorization: string; }; }; }):Promise<unknown>=>{
            newContext(context)
            const res = await getAllWorkouts()
             return res
        },
        
    },
    Mutation :{
         async createWorkout(_:unknown, args:argsForCreateWorkout, 
            context:{ req: { headers: { authorization: string; }; }; }):Promise<unknown>{
        const user = newContext(context)
            return await createWorkouts(args.input,user)
         },
         deleteWorkout:async(_:unknown, args:{id:string},  
            context:{ req: { headers: { authorization: string; }; }; }):Promise<unknown>=>{
            newContext(context)
            const id = args.id
            return await  deleteWorkout(id)
        }
     }
 }
export default workoutresolvers