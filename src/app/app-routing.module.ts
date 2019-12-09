import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { AddTrainerComponent } from './modules/add-trainer/add-trainer.component';
import { TrainersComponent } from './modules/trainers/trainers.component';
import { CoursesComponent } from './modules/courses/courses.component';
import { AddNewCourseComponent } from './modules/add-new-course/add-new-course.component';

const routes: Routes = [
  {path:'', component: DefaultComponent,
children:[{
  path:'', component:DashboardComponent
},
{
  path:'posts', component:PostsComponent 
},
{ path: 'addTrainer', component: AddTrainerComponent
},
{ path: 'trainers', component: TrainersComponent
},
{ path: 'courses', component: CoursesComponent
},
{ path: 'addNewCourse', component:AddNewCourseComponent}
]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
