import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { ApiService } from 'src/app/backend/api.service';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { Trainer } from 'src/app/models/trainer';

@Component({
  selector: 'app-turtor-form',
  templateUrl: './turtor-form.component.html',
  styleUrls: ['./turtor-form.component.scss']
})
export class TurtorFormComponent implements OnInit {

  @Input() courseId: string;

  turtorForm: FormGroup;
  private allCourses$: Observable<Course[]>;
  private turtors: Trainer[] = null;
  private turtorsOnTheCourse: Trainer[];
  private showTurtorForm: boolean = false;

  private course: string = '';

  constructor(private formBuilder: FormBuilder, private _api: ApiService, public dialog: MatDialog) {

    this.turtorForm = this.formBuilder.group({
      firstname: [null, Validators.compose([Validators.required])],
      lastname: [null, Validators.compose([Validators.required])],
      cellphone: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      password1: [null, Validators.compose([Validators.required])],
      password2: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    console.log(this.courseId)
    this.allCourses$ = this._api.getCourses();
    console.log(this.allCourses$)

    this.getTurtorsAndCourse();

  }
  private getTurtorsAndCourse() {

    this._api.getTurtors().subscribe(turtorsList => {
      let turtorObjects = [];
      for (let turtor of turtorsList) {
        let obj = new Trainer();
        obj.setId(turtor.uid);

        obj.setName(turtor.firstname);
        obj.setSurname(turtor.lastname);

        for (let courseId of turtor.course) {
          obj.setCourseList(courseId);
        }
        turtorObjects.push(obj);
      }
      this.turtors = turtorObjects;
    });

  }

  selectedCourse(courseId: string) {
    console.log("we are here...." + courseId)
    console.log(this.turtors)
    this.course = courseId;
    this.showTurtorForm = false;
    this.turtorsOnTheCourse = [];
    for (let turtor of this.turtors) {
      for (let course of turtor.getCourseList()) {
        if (course == courseId) {
          turtor.setCourseId(courseId)
          this.turtorsOnTheCourse.push(turtor);
          this.turtorsOnTheCourse.push(turtor);
          this.turtorsOnTheCourse.push(turtor);
          this.turtorsOnTheCourse.push(turtor);
          this.turtorsOnTheCourse.push(turtor);
        }
      }

    }
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
      this.getTurtorsAndCourse();
      this.selectedCourse(this.courseId);
      // this.animal = result;
    });
  }

  submitForm() {
    console.log(this.turtorForm.value)

    if (this.turtorForm.value.password1 == this.turtorForm.value.password2) {
      let turtor = new Trainer();
      turtor.setName(this.turtorForm.value.firstname);
      turtor.setSurname(this.turtorForm.value.lastname);
      turtor.setCellphone(this.turtorForm.value.cellphone);
      turtor.setEmail(this.turtorForm.value.email);
      turtor.setPassword(this.turtorForm.value.password1);
      turtor.setCourseList(this.course)
      this._api.addTutor(turtor).then(result => {
        console.log(result)
      })

    } else {
      console.log("password not the same")
    }

  }
  showForm() {
    this.showTurtorForm = true;
  }

}
