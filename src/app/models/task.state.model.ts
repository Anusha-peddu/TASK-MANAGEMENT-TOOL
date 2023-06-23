import { Task } from "./task.model";

export interface TaskState {
    Loading: boolean;
    Loaded: boolean;
    TaskList: Task[];
}
