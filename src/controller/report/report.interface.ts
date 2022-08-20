export interface IExerciseResponse{
    exerciseId: IExerciseProps;
}

export interface IExerciseProps {
    type:string;
    paused: boolean;
    pausedTime: string;
    completed: boolean;
}

export interface WorkoutResponse{
    workoutId:IExerciseResponse
}