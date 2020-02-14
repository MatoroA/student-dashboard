import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';

import { TrainersComponent } from './modules/trainers/trainers.component';
import { CoursesComponent } from './modules/courses/courses.component';
import { AddNewCourseComponent } from './modules/add-new-course/add-new-course.component';
import { AddCourseContentComponent } from './modules/add-course-content/add-course-content.component';

import { LoginComponent } from './login/login.component';
import { ApplicationsComponent } from './modules/applications/applications.component';
import { AddUserComponent } from './modules/add-user/add-user.component';
import { EditCourseComponent } from './modules/edit-course/edit-course.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'default', component: DefaultComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: 'home',
        component: DashboardComponent,
        canActivate: [CanActivateRouteGuard]
      },
      {
        path: 'posts',
        component: PostsComponent,
        canActivate: [CanActivateRouteGuard]
      },
      {
        path: 'trainers',
        component: TrainersComponent,
        canActivate: [CanActivateRouteGuard]
      },
      {
        path: 'courses',
        component: CoursesComponent,
        canActivate: [CanActivateRouteGuard]
      },
      {
        path: 'addNewCourse',
        component: AddNewCourseComponent,
        canActivate: [CanActivateRouteGuard]
      },
      {
        path: 'addCourseContent',
        component: AddCourseContentComponent,
        canActivate: [CanActivateRouteGuard]
      },
      {
        path: 'applications',
        component: ApplicationsComponent,
        canActivate: [CanActivateRouteGuard]
      },
      {
        path: 'addUser', component: AddUserComponent,
        canActivate: [CanActivateRouteGuard]
      },
      {
        path: 'editCourse', component: EditCourseComponent,
        canActivate: [CanActivateRouteGuard]
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
