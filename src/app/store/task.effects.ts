import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  GET_TASK,
  TaskError,
  GetTaskSuccess,
  GetTask,
  UPDATE_TASK,
  UpdateTask,
  UpdateTaskSuccess,
  DELETE_TASK,
  DeleteTask,
  DeleteTaskSuccess,
  DeleteTaskError,
  UpdateTaskError,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  DeleteMultipleTask,
  DELETE_MULTIPLE_TASK,
  UPDATE_MULTIPLE_TASK,
  UpdateMultipleTasksDoneSuccess,
  UpdateMultipleTasksDone,
  DeleteMultipleTaskSuccess,
} from './task.action';
import { TasksService } from '../services/tasks.service';
import { ToDoState } from '../models/todo.state.model';
import { getAllTasks } from './task.selectors';
import { Task } from '../models/task.model';
import { Go } from './router.actions';

@Injectable()
export class TaskEffects {
  constructor(
    private action$: Actions,
    private tasksService: TasksService,
    private store: Store<ToDoState>
  ) {}

  getTasks$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType<GetTask>(GET_TASK),
      withLatestFrom(this.store.select(getAllTasks)),
      filter(([_, data]) => !(data.length > 0)),
      switchMap(() => {
        return this.tasksService.getToDos().pipe(
          map((data) => {
            return new GetTaskSuccess(data);
          }),
          catchError((error) => {
            return of(new TaskError(error));
          })
        );
      })
    )
  );

  deleteTask$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType<DeleteTask>(DELETE_TASK),
      map((action: DeleteTask) => action.payload),
      switchMap((taskId: number) => {
        return this.tasksService.deleteTask(taskId).pipe(
          map((data: Task[]) => {
            return new DeleteTaskSuccess(data);
          }),
          catchError((error) => {
            return of(new DeleteTaskError(error));
          })
        );
      })
    )
  );

  updateTask$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType<UpdateTask>(UPDATE_TASK),
      map((action: UpdateTask) => {
        return action.payload;
      }),
      switchMap((task: Task) => {
        return this.tasksService.updateTask(task).pipe(
          map((data: Task[]) => {
            return new UpdateTaskSuccess(data);
          }),
          catchError((error) => {
            return of(new UpdateTaskError(error));
          })
        );
      })
    )
  );

  updateTaskSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(UPDATE_TASK_SUCCESS),
        map((action: UpdateTaskSuccess) => action.payload),
        map((task: Task[]) => {
          return new Go({
            path: ['/app-task-list'],
          });
        })
      )
  );

  deleteTaskSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(DELETE_TASK_SUCCESS),
        map((action: DeleteTaskSuccess) => action.payload),
        map((task: Task[]) => {
          return new Go({
            path: ['/app-task-list'],
          });
        })
      )
  );

  deleteMultipleTask$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType<DeleteMultipleTask>(DELETE_MULTIPLE_TASK),
      map((action: DeleteMultipleTask) => {
        return action.payload;
      }),
      switchMap((tasks: Task[]) => {
        return this.tasksService.deleteMultipleTasks(tasks).pipe(
          map((data: Task[]) => {
            return new DeleteMultipleTaskSuccess(data);
          }),
          catchError((error) => {
            return of(new DeleteTaskError(error));
          })
        );
      })
    )
  );

  UpdateMultipleTaskToDone$: Observable<Action> = createEffect(() =>
  this.action$.pipe(
    ofType<UpdateMultipleTasksDone>(UPDATE_MULTIPLE_TASK),
    map((action: UpdateMultipleTasksDone) => {
      return action.payload;
    }),
    switchMap((tasks: Task[]) => {
      return this.tasksService.updateMultipleTaskAsDone(tasks).pipe(
        map((data: Task[]) => {
          return new UpdateMultipleTasksDoneSuccess(data);
        }),
        catchError((error) => {
          return of(new UpdateTaskError(error));
        })
      );
    })
  )
);
}
