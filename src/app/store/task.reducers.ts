import { TaskState } from '../models/task.state.model';
import * as taskActions from './task.action';

const initialState: TaskState = {
  Loading: false,
  Loaded: false,
  TaskList: [],
};

export function TaskReducer(
  state: TaskState = initialState,
  action: taskActions.ToDoActions
) {
  switch (action.type) {
    case taskActions.GET_TASK:
      return { ...state, Loading: true };

    case taskActions.GET_TASK_SUCCESS:
      return {
        ...state,
        Loading: false,
        Loaded: true,
        TaskList: action.payload,
      };

    case taskActions.GET_TASK_ERROR:
      return {
        ...state,
        Loading: false,
        Loaded: false,
      };

    case taskActions.UPDATE_TASK:
      return {
        ...state,
        Loading: true,
        Loaded: false,
      };

    case taskActions.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        Loading: false,
        Loaded: true,
        TaskList: action.payload,
      };

    case taskActions.UPDATE_TASK_ERROR:
      return {
        ...state,
        Loading: false,
        Loaded: false,
      };

    case taskActions.DELETE_TASK:
      return {
        ...state,
        Loading: true,
        Loaded: false,
      };

    case taskActions.DELETE_TASK_SUCCESS:
      return {
        ...state,
        Loading: false,
        Loaded: true,
        TaskList: action.payload,
      };

    case taskActions.DELETE_TASK_ERROR:
      return {
        ...state,
        Loading: false,
        Loaded: false,
      };

    case taskActions.DELETE_MULTIPLE_TASK:
      return {
        ...state,
        Loading: true,
        Loaded: false,
      };

    case taskActions.DELETE_MULTIPLE_TASK_SUCCESS:
      return {
        ...state,
        Loading: false,
        Loaded: true,
        TaskList: action.payload,
      };

      case taskActions.UPDATE_MULTIPLE_TASK:
        return {
          ...state,
          Loading: true,
          Loaded: false,
        };
  
      case taskActions.UPDATE_MULTIPLE_TASK_SUCCESS:
        return {
          ...state,
          Loading: false,
          Loaded: true,
          TaskList: action.payload,
        };
    default:
      return state;
  }
}

export const getTasksLoading = (state: TaskState) => state.Loading;
export const getTasksLoaded = (state: TaskState) => state.Loaded;
export const getTasks = (state: TaskState) => state?.TaskList;
