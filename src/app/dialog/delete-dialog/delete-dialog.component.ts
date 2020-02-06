import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/modules/add-user/add-user.component';
import { StoringUserDataService } from 'src/app/backend/storing-user-data.service';
import { ApiService } from 'src/app/backend/api.service';
import { Course } from 'src/app/models/course';
import { Trainer } from 'src/app/models/trainer';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  
  private currentCourse: Course;
  private user: Trainer;
  private temporaryList: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _apiService: ApiService, private _storedData: StoringUserDataService) { 
    }
 
  ngOnInit() {

    this.currentCourse = this._storedData.getCurrentCourse();
    this.user = this._storedData.getSelectedUser();

    console.log(this.currentCourse);
    console.log(this.user)
  }

  removeUser(){
    for( let course of this.user.courseList ){
      if(course != this.currentCourse.id ){
        this.temporaryList.push(course);
      }
    }

    this.user.courseList = this.temporaryList;

    this._apiService.updateCourseList(this.user.uid, this.user.courseList)
    .then(()=>{
      this.dialogRef.close('User has been successfully removed.');
    })
    
  }

}
