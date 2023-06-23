import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../models/task.model';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { TaskState } from '../models/task.state.model';
import { map } from 'rxjs';
import {
  DeleteMultipleTask,
  UpdateMultipleTasksDone,
} from '../store/task.action';
import { getAllTasks } from '../store/task.selectors';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {

  @ViewChild('tasksPaginator', { static: true }) paginator: MatPaginator;

  displayedColumns = ['select', 'title', 'completed'];
  dataSource = new MatTableDataSource<Task>();
  selection = new SelectionModel<Task>(true, []);
  taskData: Task[];

  constructor(private store: Store<TaskState>) {}

  ngOnInit(): void {
    this.store
      .select(getAllTasks)
      .pipe(
        map((result: Task[]) => {
          this.taskData = result;
          this.dataSource = new MatTableDataSource<Task>(this.taskData);
          this.dataSource.paginator = this.paginator;
        })
      )
      .subscribe();
  }

  onSelectedRowsDelete(): void {
    if (this.selection.selected.length > 0) {
      this.store.dispatch(new DeleteMultipleTask(this.selection.selected));
      this.selection.clear();
    } else {
      window.alert('Please select tasks to delete.');
    }
  }

  onSelectedRowsMarkAsDone(): void {
    if (this.selection.selected.length > 0) {
      this.store.dispatch(new UpdateMultipleTasksDone(this.selection.selected));
      this.selection.clear();
    } else {
      window.alert('Please select tasks to mark as done.');
    }
  }

  onApplyFilter(event: Event): void {
    let filterInput = (event.target as HTMLInputElement).value;
    filterInput = filterInput.trim();
    filterInput = filterInput.toLowerCase();
    this.dataSource.filter = filterInput;
  }
}
