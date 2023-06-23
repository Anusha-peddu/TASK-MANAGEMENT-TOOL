import { TaskState } from "../models/task.state.model";

export const initializeState = (): TaskState => {
    return ({
        TaskList: [],
        Loading: false,
        Loaded: true
    });
}