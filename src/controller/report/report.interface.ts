export interface IExerciseResponse{
    exerciseId: IExerciseProps;
}

export interface IExerciseProps {
    type:string;
    paused: boolean;
    limit: string;
    completed: boolean;
    progress: number;
}

export interface WorkoutResponse{
    workoutId:IExerciseResponse
}