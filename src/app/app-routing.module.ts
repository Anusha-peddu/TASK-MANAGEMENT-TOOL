import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-item/task-item.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'app-task-list' },
  {
    path: 'app-task-list',
    component: TaskListComponent,
    
  },
  {
    path: 'app-task-list/app-task-item/:id',
    component: TaskItemComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
