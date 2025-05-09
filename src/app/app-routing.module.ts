import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentManagementComponent } from './student-management/student-management.component';
import { DriveManagementComponent } from './drive-management/drive-management.component';
import { ReportsComponent } from './reports/reports.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '', redirectTo:'/login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path:'', 
    component: LayoutComponent,
    children:[
      {
        path: 'student-management', component: StudentManagementComponent
      },
      {
        path: 'drive-management', component: DriveManagementComponent
      },
      {
        path: 'reports', component: ReportsComponent
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
