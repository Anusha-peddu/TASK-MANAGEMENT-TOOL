import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskState } from './models/task.state.model';
import { GetTask } from './store/task.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'task-management-tool';

  constructor(private store: Store<TaskState>) {}

  ngOnInit(): void {
    this.store.dispatch(new GetTask());
  }
  
}
