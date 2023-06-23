import { Action } from '@ngrx/store';
import { Task } from '../models/task.model';

export const GET_TASK = '[Task List Component] GET_TASK';
export const GET_TASK_SUCCESS = '[Task List Component] GET_TASK_SUCCESS';
export const GET_TASK_ERROR = '[Task List Component] GET_TASK_ERROR';

export const UPDATE_TASK = '[Task Item Component] UPDATE_TASK';
export const UPDATE_TASK_SUCCESS = '[Task Item Component] UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_ERROR = '[Task Item  Component] UPDATE_TASK_ERROR';

export const DELETE_TASK = '[Task Item Component] DELETE_TASK';
export const DELETE_TASK_SUCCESS = '[Task Item Component] DELETE_TASK_SUCCESS';
export const DELETE_TASK_ERROR = '[Task Item Component] DELETE_TASK_ERROR';

export const DELETE_MULTIPLE_TASK =
  '[Task List Component] DELETE_MULTIPLE_TASK';
export const DELETE_MULTIPLE_TASK_SUCCESS =
  '[Task List Component] DELETE_MULTIPLE_TASK_SUCCESS';
export const DELETE_MULTIPLE_TASK_ERROR =
  '[Task List Component] DELETE_MULTIPLE_TASK_ERROR';

export const UPDATE_MULTIPLE_TASK =
  '[Task List Component] UPDATE_MULTIPLE_TASK';
export const UPDATE_MULTIPLE_TASK_SUCCESS =
  '[Task List Component] UPDATE_MULTIPLE_TASK_SUCCESS';
export const UPDATE_MULTIPLE_TASK_ERROR =
  '[Task List Component] UPDATE_MULTIPLE_TASK_ERROR';

export class GetTask implements Action {
  readonly type = GET_TASK;
  constructor() {}
}

export class GetTaskSuccess implements Action {
  readonly type = GET_TASK_SUCCESS;
  constructor(public payload: Task[]) {}
}

export class TaskError implements Action {
  readonly type: string = GET_TASK_ERROR;

  constructor(public payload: any) {}
}

export class UpdateTask implements Action {
  readonly type = UPDATE_TASK;
  constructor(public payload: Task) {}
}

export class UpdateTaskSuccess implements Action {
  readonly type = UPDATE_TASK_SUCCESS;
  constructor(public payload: Task[]) {}
}

export class UpdateTaskError implements Action {
  readonly type: string = UPDATE_TASK_ERROR;

  constructor(public payload: any) {
    console.log(this.payload);
  }
}

export class DeleteTask implements Action {
  readonly type = DELETE_TASK;
  constructor(public payload: number) {}
}

export class DeleteTaskSuccess implements Action {
  readonly type = DELETE_TASK_SUCCESS;
  constructor(public payload: Task[]) {}
}

export class DeleteTaskError implements Action {
  readonly type: string = DELETE_TASK_ERROR;
  constructor(public payload: any) {}
}

export class DeleteMultipleTask implements Action {
  readonly type = DELETE_MULTIPLE_TASK;
  constructor(public payload: Task[]) {}
}

export class DeleteMultipleTaskSuccess implements Action {
  readonly type = DELETE_MULTIPLE_TASK_SUCCESS;
  constructor(public payload: Task[]) {}
}

export class UpdateMultipleTasksDone implements Action {
  readonly type = UPDATE_MULTIPLE_TASK;
  constructor(public payload: Task[]) {}
}

export class UpdateMultipleTasksDoneSuccess implements Action {
  readonly type = UPDATE_MULTIPLE_TASK_SUCCESS;
  constructor(public payload: Task[]) {}
}

export type ToDoActions =
  | GetTask
  | GetTaskSuccess
  | TaskError
  | UpdateTask
  | UpdateTaskSuccess
  | DeleteTask
  | DeleteTaskSuccess
  | DeleteTaskError
  | UpdateTaskError
  | DeleteMultipleTask
  | DeleteMultipleTaskSuccess
  | UpdateMultipleTasksDone
  | UpdateMultipleTasksDoneSuccess;
