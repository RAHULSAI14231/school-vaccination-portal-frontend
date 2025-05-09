import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './header/header.component';
import { StudentManagementComponent } from './student-management/student-management.component';
import { DriveManagementComponent } from './drive-management/drive-management.component';
import { ReportsComponent } from './reports/reports.component';
import { LayoutComponent } from './layout/layout.component';
import { PaginationComponent } from './pagination/pagination.component';
import { BrowserPlatformLocation } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    StudentManagementComponent,
    DriveManagementComponent,
    ReportsComponent,
    LayoutComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
