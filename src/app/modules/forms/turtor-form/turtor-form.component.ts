import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { ApiService } from 'src/app/backend/api.service';
import { MatDialog, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { Trainer } from 'src/app/models/trainer';
import { UpdateTurtorComponent } from 'src/app/dialog/update-turtor/update-turtor.component';
import { StoringUserDataService } from 'src/app/backend/storing-user-data.service';

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
  private tableData = new MatTableDataSource<any>();
  private course: string = '';
  private toggleChecked: boolean = false;
  private rowClicked: number = null;

  displayedColumns: string[] = ['position', 'applicant', 'course'];
  pageSizeOptions;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder, private _api: ApiService,
     private _userdata: StoringUserDataService ,public dialog: MatDialog) {

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
    this.allCourses$ = this._api.getCourses();

    this.allCourses$.subscribe(courses=>{
        this._userdata.setCurrentCourses(courses);
        console.log(courses)
    });
    this.getTurtorsAndCourse();

  }
  private getTurtorsAndCourse() {
    this._api.getTurtors().subscribe(turtorsList => {

      this._userdata.setAllTurtors(turtorsList)
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
        console.log()
      }
      this.turtors = turtorObjects;
    });
  }

  selectedCourse(courseId: string) {
    this.course = courseId;
    this.showTurtorForm = false;
    this.turtorsOnTheCourse = [];
    for (let turtor of this.turtors) {
      for (let course of turtor.getCourseList()) {
        if (course == courseId) {
          console.log(course)
          turtor.setCourseId(courseId)
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

  changed(event) {

    this.toggleChecked = event.checked;
    this.tableData = new MatTableDataSource<any>();
    let index = 0;
    for (let trainer of this.turtors) {

      console.log(trainer)
      let obj = {
        name: trainer.getName() + ' ' + trainer.getSurnmae(),
        turtorUid: trainer.getId(),
        course: trainer.getCourseList().length,
        courseList: trainer.getCourseList().length,
        position: ++index
      }
      this.tableData.data.push(obj);
      this.tableData._updateChangeSubscription();
    }
  }

  turtorRowClicked(row) {
    const dialogRef = this.dialog.open(UpdateTurtorComponent, {
      width: '500px',
      height: 'auto',
      data: {
        userId: row.turtorUid,
        courseId: this.course
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getTurtorsAndCourse();
      this.selectedCourse(this.courseId);
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

}
