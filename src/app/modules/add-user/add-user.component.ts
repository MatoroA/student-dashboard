import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/backend/api.service';
import { Trainer } from 'src/app/models/trainer';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';

export interface DialogData{
  userId: string;
  courseId: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  turtorForm: FormGroup;
  private allCourses$: Observable<Course[]>;
  private courseId: string;
  private turtors: Trainer[];
  private userId: number = null;
  private showTurtorForm: boolean = false;
  private turtorsOnTheCourse: Trainer[];

  constructor(private formBuilder: FormBuilder, private _api: ApiService, public dialog: MatDialog) { 
    this.turtors = [];
    this.turtorsOnTheCourse = [];
  }


  ngOnInit() {
    this.allCourses$ = this._api.getCourses();
    console.log(this.allCourses$)
   this.turtorForm = this.formBuilder.group({
    firstname: [null, Validators.compose([Validators.required])],
     lastname: [null, Validators.compose([Validators.required])],
     email: [null, Validators.compose([Validators.required])],
     cellnumber: [null, Validators.compose([Validators.required])],
     idnumber:[null, Validators.compose([Validators.required])]
    });

    this.getTurtorsAndCourse();
  }

  newTurtorForm(){
    console.log(this.turtorForm.value)
    console.log(this.courseId)
  }

  userType(event){
    console.log(event.value)
    this.userId = event.value;
    this.showTurtorForm = false;
    this.turtorsOnTheCourse = [];
  }

  private getTurtorsAndCourse(){

    this._api.getTurtors().subscribe(turtorsList=>{
      let turtorObjects = [];
      for(let turtor of turtorsList){
        let obj = new Trainer();
        obj.setId(turtor.uid);

        obj.setName(turtor.firstname);
        obj.setSurname(turtor.lastname);

        for(let courseId of turtor.course){
          obj.setCourseList(courseId);
        }
        turtorObjects.push(obj);
      }
      this.turtors = turtorObjects;
    });

  }

   selectedCourse(courseId: string){
     console.log("we are here...." + courseId)
     console.log(this.turtors)
     this.showTurtorForm = false;
     this.turtorsOnTheCourse = [];
    for(let turtor of this.turtors){
      for(let course of turtor.getCourseList()){
        if(course == courseId){
          turtor.setCourseId(courseId)
          this.turtorsOnTheCourse.push(turtor);
          this.turtorsOnTheCourse.push(turtor);
          this.turtorsOnTheCourse.push(turtor);
          this.turtorsOnTheCourse.push(turtor);
          this.turtorsOnTheCourse.push(turtor);
          this.turtorsOnTheCourse.push(turtor);
          this.turtorsOnTheCourse.push(turtor);
          this.turtorsOnTheCourse.push(turtor);
        }
      }
      
    }
  }

  // delete(id: string){
  //   console.log(id)
  // }
  private addTurtor(){
    this.showTurtorForm = true;
  }

  delete(uid: string, courseid: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      height: 'auto',
      data: {
        userId: uid,
        courseId: courseid
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
