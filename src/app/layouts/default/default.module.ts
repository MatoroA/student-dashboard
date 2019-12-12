import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatDividerModule, MatCardModule, MatTableModule, MatStepperModule, MatButtonModule, MatPaginatorModule, MatSortModule, MatInputModule, MatFormFieldModule, MatIconModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AddNewCourseComponent } from 'src/app/modules/add-new-course/add-new-course.component';
import { CoursesComponent } from 'src/app/modules/courses/courses.component';
import { TrainersComponent } from 'src/app/modules/trainers/trainers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import { AddCourseContentComponent } from 'src/app/modules/add-course-content/add-course-content.component';

import { AddAdminComponent } from 'src/app/modules/add-admin/add-admin.component';
import { ApplicationsComponent } from 'src/app/modules/applications/applications.component';
import { AddUserComponent } from 'src/app/modules/add-user/add-user.component';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    AddNewCourseComponent,
    CoursesComponent,
    TrainersComponent,
    AddCourseContentComponent,
    AddAdminComponent,
    ApplicationsComponent,
    AddUserComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class DefaultModule { }
