import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task } from '../models/task.model';
import { ToDoState } from '../models/todo.state.model';
import { getSelectedTask } from '../store/task.selectors';
import { DeleteTask, UpdateTask } from '../store/task.action';
import { Go } from '../store/router.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {

  form: FormGroup;
  taskItemSubscription: Subscription;

  constructor(
    private store: Store<ToDoState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      completed: [false],
    });
      this.store.select(getSelectedTask).subscribe((data: Task) => {
        this.form.patchValue(data);
      });
  }

  onSubmit() {
    if (this.form.valid) {
        this.store.dispatch(new UpdateTask(this.form.value));
    }
  }

  onDelete() {
    this.store.dispatch(new DeleteTask(this.form.value.id));
  }

  onCancel() {
    this.store.dispatch(
      new Go({
        path: [''],
      })
    );
  }
}
