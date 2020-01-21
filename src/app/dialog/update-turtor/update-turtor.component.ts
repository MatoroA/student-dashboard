import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'src/app/backend/api.service';
import { DialogData } from 'src/app/modules/add-user/add-user.component';
import { StoringUserDataService } from 'src/app/backend/storing-user-data.service';
import { Turtor } from 'src/app/models/turtor';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-update-turtor',
  templateUrl: './update-turtor.component.html',
  styleUrls: ['./update-turtor.component.scss']
})
export class UpdateTurtorComponent implements OnInit {

  private courseId: string = null;
  private uid: string = null;
  private trainers: Turtor[];
  private courses: Course[];

  private selectedTrainer: Turtor;
  private selectedCourse: Course;

  private trainerCourseDb: String[] = []
  
  constructor( public dialogRef: MatDialogRef<UpdateTurtorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _apiService: ApiService,
    private _userDataService: StoringUserDataService) { 
    }

  ngOnInit() {


    console.log("Hi am consoling from update turtor.."  + this.data.courseId);
    this.uid = this.data.userId;
    this.courseId = this.data.courseId;
    this.trainers = this._userDataService.getAllTurtors();
    this.courses = this._userDataService.getCurrentCourses();


    for(let item of this.trainers){
      if( item.uid == this.uid ){
        this.selectedTrainer = item;
        this.trainerCourseDb = this.selectedTrainer.course;
        // return;
      }
    }

    for(let item of this.courses){
      if( item.id == this.courseId ){
        this.selectedCourse = item;
        console.log("selected item")
        // return;
      }
    }
  }


  assignBtn(){
    this.trainerCourseDb.push(this.selectedCourse.id);
    this._apiService.updateCourseList(this.selectedTrainer.uid, this.trainerCourseDb);
    this.dialogRef.close('');
  }
}
