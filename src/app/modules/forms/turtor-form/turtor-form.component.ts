import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { ApiService } from 'src/app/backend/api.service';
import { MatDialog, MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
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
  private isShowForm: boolean = false;
  private tableData = new MatTableDataSource<any>();
  private course: string = '';
  private toggleChecked: boolean = false;
  private rowClicked: number = null;

  private currentCourse: Course = null;

  displayedColumns: string[] = ['position', 'applicant', 'course'];
  pageSizeOptions;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder, private _api: ApiService, private _snackBar: MatSnackBar,
    private _userdata: StoringUserDataService, public dialog: MatDialog) {

    this.turtorForm = this.formBuilder.group({
      firstname: [null, Validators.compose([Validators.required])],
      lastname: [null, Validators.compose([Validators.required])],
      cellphone: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      password1: [null, Validators.compose([Validators.required])],
      password2: [null]
    });
  }

  ngOnInit() {
    this.allCourses$ = this._api.getCourses();
    this.getTurtorsAndCourse();

  }
  private getTurtorsAndCourse() {
    this._api.getTurtors().subscribe(turtorsList => {
      console.log(turtorsList)
      // this._userdata.setAllTurtors(turtorsList)
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

  selectedCourse(course: Course) {
    this.courseId = course.id;
    this.isShowForm = false;
    this.currentCourse = course;
    this.toggleChecked = false;

    this._userdata.setCurrentCourse(course);
    this.turtorsOnTheCourse = [];
    for (let turtor of this.turtors) {
      for (let course of turtor.getCourseList()) {
        if (course == this.courseId) {
          turtor.setCourseId(this.courseId)
          this.turtorsOnTheCourse.push(turtor);
        }
      }
    }
  }

  showForm() {

    if (this.toggleChecked) {
      this.toggleChecked = false;
    }
  }

  delete(user: Trainer): void {
    this._userdata.setSelectedUser(user);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getTurtorsAndCourse();
      this.selectedCourse(this.currentCourse);
      this.openSnackBar(result);
      this.tableDataInfo();
    });
  }

  changed(event) {
    this.toggleChecked = event.checked;
    console.log(this.toggleChecked)
    this.tableDataInfo();

    if (this.toggleChecked) {
      this.isShowForm = false;
    }
  }

  tableDataInfo() {
    this.tableData = new MatTableDataSource<any>();
    let index = 0;

    let isCurrentTurtor = false;

    console.log(this.turtors)

    for (let trainer of this.turtors) {
      for (let courseId of trainer.getCourseList()) {
        if (courseId == this.courseId)
          isCurrentTurtor = true;
      }

      if (!isCurrentTurtor) {
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

      isCurrentTurtor = false;
    }

  }
  turtorRowClicked(i) {
    console.log(i)
    this._userdata.setSelectedUser(this.turtors[i]);
    const dialogRef = this.dialog.open(UpdateTurtorComponent, {
      width: '500px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if(result != null){
        this.getTurtorsAndCourse();
        this.selectedCourse(this.currentCourse);
        this.openSnackBar(result);
        this.tableDataInfo();
      }
    });
  }

  openSnackBar(message) {
    this._snackBar.open(message, "Ok", {
      duration: 5000,
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
