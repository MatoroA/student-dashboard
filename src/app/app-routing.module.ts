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


const routes: Routes = [
  {path:'default', component: DefaultComponent,
children:[{
  path:'', component:DashboardComponent
},
{
  path:'posts', component:PostsComponent 
},
{ path: 'trainers', component: TrainersComponent
},
{ path: 'courses', component: CoursesComponent
},
{ path: 'addNewCourse', component:AddNewCourseComponent
},
{ path: 'addCourseContent', component: AddCourseContentComponent
},

{path: 'applications', component:ApplicationsComponent},
{path: 'addUser', component:AddUserComponent}

]
},{path: '' , component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
