import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Observable, catchError, throwError, map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { ToDoState } from '../models/todo.state.model';
import { getAllTasks } from '../store/task.selectors';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiURL: string = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient, private store: Store<ToDoState>) {}

  getToDos(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.apiURL)
      .pipe(catchError((error: any) => throwError(() => error.json())));
  }

  updateTask(updatedTask: Task): Observable<Task[]> {
    return this.store.select(getAllTasks).pipe(
      take(1),
      map((allTasks: Task[]) => {
        const recordIndex = allTasks.findIndex(
          (record: Task) => record.id === updatedTask.id
        );
        if (recordIndex > -1) {
          const updatedRecords = [...allTasks];
          updatedRecords[recordIndex] = updatedTask;
          return updatedRecords;
        }
        return allTasks;
      })
    );
  }

  updateMultipleTaskAsDone(tasksToUpdate: Task[]) {
    return this.store.select(getAllTasks).pipe(
      take(1),
      map((allTasks: Task[]) => {
        return (allTasks = allTasks.map((task) => {
          const matchingTask = tasksToUpdate.find(
            (updatedTask) => updatedTask.id === task.id
          );
          if (matchingTask) {
            return { ...matchingTask, completed: true };
          }
          return task;
        }));
      })
    );
  }

  deleteTask(taskId: number): Observable<Task[]> {
    return this.store.select(getAllTasks).pipe(
      take(1),
      map((allTasks: Task[]) => {
        return allTasks.filter((task: Task) => task.id !== taskId);
      })
    );
  }

  deleteMultipleTasks(tasks: Task[]) {
    return this.store.select(getAllTasks).pipe(
      take(1),
      map((allTasks: Task[]) => {
        return allTasks.filter((task: Task) => !tasks.includes(task));
      })
    );
  }
}
