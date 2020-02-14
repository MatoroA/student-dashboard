import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { MatDialogRef } from '@angular/material';
import { StoringUserDataService } from 'src/app/backend/storing-user-data.service';
import { ApiService } from 'src/app/backend/api.service';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrls: ['./delete-course.component.scss']
})
export class DeleteCourseComponent implements OnInit {

  private course: Course;
  constructor(public dialogRef: MatDialogRef<DeleteCourseComponent>,
     private _storedCourse: StoringUserDataService, private _apiService: ApiService) { }

  ngOnInit() {

    this.course = this._storedCourse.getCurrentCourse();
    console.log(this.course)
  }

  deleteCourse(){
    this._apiService.deleteCourse(this.course.id).then(message=>{
      console.log(message)
    })
  }

}
