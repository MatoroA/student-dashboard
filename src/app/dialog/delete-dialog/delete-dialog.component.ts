import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/modules/add-user/add-user.component';
import { ApiService } from 'src/app/backend/api.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  private courseId: string = null;
  private userId: string = null;
  private courseName: string = null;
  private courseCode: string = null;
  private userName: string = null;
  private courses: string[] = [];
  private newCourses: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _apiService: ApiService) { 
    }

  ngOnInit() {
    this.courseId = this.data.courseId;
    console.log(this.courseId)
    this._apiService.getCourseDocument(this.courseId).subscribe(courseDoc =>{
      this.courseName = courseDoc.name;
      this.courseCode = courseDoc.code;
    });

    this.userId = this.data.userId;
    console.log(this.userId)
    this._apiService.getTurtorDoc(this.userId).subscribe(turtorDoc=>{
      this.userName = turtorDoc.firstname + ' ' + turtorDoc.lastname;

      for(let course of turtorDoc.course){
        this.courses.push(course);
      }
    })
  }

  removeUser(){
    console.log(this.courses)
    this.newCourses = [];
    for( let course of this.courses ){
      if(course != this.courseId ){
        this.newCourses.push(course);
      }
    }

    this._apiService.updateCourses(this.userId, "turtors", this.userId, this.newCourses)
    console.log(this.newCourses)
    this.dialogRef.close('');
  }



}
