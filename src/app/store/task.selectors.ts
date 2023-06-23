import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { getTasks, getTasksLoaded, getTasksLoading } from './task.reducers';
import { getRouterState } from './router.state';
import { Task } from '../models/task.model';
import { TaskState } from '../models/task.state.model';

export const getToDoState = createFeatureSelector<TaskState>('items');
export const getAllTasks = createSelector(getToDoState, getTasks);
export const getAllTasksLoading = createSelector(getToDoState, getTasksLoading);
export const getAllTasksLoaded = createSelector(getToDoState, getTasksLoaded);

export const getSelectedTask = createSelector(
  getAllTasks,
  getRouterState,
  (tasks, router): Task => { 
    return (
      router?.state &&
      tasks?.filter((task: Task) => task.id == router.state.params['id'])?.[0]
    );
  }
);
