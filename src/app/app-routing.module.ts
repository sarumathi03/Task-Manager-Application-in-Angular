import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { HomepageComponent } from './dashboard/homepage/homepage.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { CompletedTaskListComponent } from './tasks/completed-task-list/completed-task-list.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';


const routes: Routes = [
  {path: '', component:LoginComponent},
  
  {
    path: 'home', component: HomepageComponent,canActivate:[authGuard],
    children:[
      { path: 'createtask', component: TaskFormComponent },
      { path: 'tasklist', component:TaskListComponent },
      {path:"edit/:id", component: TaskFormComponent},
      {path:"completed", component: CompletedTaskListComponent}
      
    ]
  },
  {path:"**", redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
