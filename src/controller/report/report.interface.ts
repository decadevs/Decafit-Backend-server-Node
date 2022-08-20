export interface ExcerciseResponse{
    exerciseId: {
        type:string;
        paused: boolean;
        pausedTime: string;
        completed: boolean;
    };
}

export interface WorkoutResponse{
    workoutId:ExcerciseResponse
}