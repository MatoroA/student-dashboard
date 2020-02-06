import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'src/app/backend/api.service';
import { DialogData } from 'src/app/modules/add-user/add-user.component';
import { StoringUserDataService } from 'src/app/backend/storing-user-data.service';
import { Course } from 'src/app/models/course';
import { Trainer } from 'src/app/models/trainer';

@Component({
  selector: 'app-update-turtor',
  templateUrl: './update-turtor.component.html',
  styleUrls: ['./update-turtor.component.scss']
})
export class UpdateTurtorComponent implements OnInit {
  private selectedTrainer: Trainer;
  private selectedCourse: Course;

  private trainerCourseDb: String[] = []
  
  constructor( public dialogRef: MatDialogRef<UpdateTurtorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _apiService: ApiService,
    private _userDataService: StoringUserDataService) { 
    }

  ngOnInit() {

    this.selectedTrainer = this._userDataService.getSelectedUser();
    this.selectedCourse = this._userDataService.getCurrentCourse();

    console.log(this.selectedTrainer.courseList);
    console.log(this.selectedCourse);

    for(let item of this.selectedTrainer.getCourseList()){

    }
  }


  assignBtn(){
    this.selectedTrainer.courseList.push(this.selectedCourse.id);
    console.log(this.selectedTrainer.courseList)
    this._apiService.updateCourseList(this.selectedTrainer.uid, this.selectedTrainer.courseList)
    .then( message =>{
      this.dialogRef.close("User has been successfully assigned!");
    })
    
  }
}
