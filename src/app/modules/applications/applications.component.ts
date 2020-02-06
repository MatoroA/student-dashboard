import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ApiService } from 'src/app/backend/api.service';
import { EnrolledStudent } from 'src/app/models/enrolledStudents';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student';
import { ApplicantComponent } from 'src/app/dialog/applicant/applicant.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  course;
  private tableData = new MatTableDataSource<Student>();
  enrolledArray: EnrolledStudent[] = [];
  isChecked: boolean = false;
  displayedColumns: string[] = ['applicant', 'course', 'cellphone', 'Status','id'];
  pageSizeOptions;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _apiService: ApiService, private changeDetectorRefs: ChangeDetectorRef, public dialog: MatDialog) {

    this.course = this._apiService.getCourses();

  }
  async ngOnInit() {
    this._apiService.getCourses().subscribe(courseList => {
      this.enrolledArray = []
      for (let i = 0; i < courseList.length; i++) {
        let obj = new EnrolledStudent();
        obj.setCourseId(courseList[i].id);
        obj.setCourse(courseList[i]);
        this.enrolledArray.push(obj)
      }
    });

    this._apiService.getStudentCourse().subscribe(enrolledList => {

      for (let i = 0; i < this.enrolledArray.length; i++) {
        this.enrolledArray[i].clearStudentList();
      }
      for (let item of enrolledList) {
        for (let j = 0; j < this.enrolledArray.length; j++) {
          if (!enrolledList[j].status) {
            if (this.enrolledArray[j].getCourseId() === item.courseID) {
              this._apiService.getStudentDoc(item.userID).subscribe(studentDoc => {
                studentDoc.studentCourseId = enrolledList[j].id;
                studentDoc.status = enrolledList[j].status;
                this.enrolledArray[j].setStudentsList(studentDoc);
              });
            }
          }
        }

      }

      this.showAllStudents()

    });
  }

  doSomething(event) {
    let selectedCourseId = event.value;
    let courseName;
    let index = 0;
    this.isChecked = false;

    this.tableData = new MatTableDataSource<Student>();
    for (let item of this.enrolledArray) {
      courseName = item.getCourse().name;
      if (item.getCourseId() == selectedCourseId) {

        for (let j of item.getStudentsList()) {
          console.log(j)
          ++index;
          this.tableData.data.push(j)
          this.tableData._updateChangeSubscription();
          this.changeDetectorRefs.detectChanges();
        }
      }
    }
  }

  showAllStudents() {
    this.tableData = new MatTableDataSource<Student>();
    this.isChecked = true;

    let index = 0;
    for (let i of this.enrolledArray) {
      console.log(i)
      let courseName = i.getCourse().name;
      setTimeout(() => {
        for (let j of i.getStudentsList()) {
          ++index;
          
          this.tableData.data.push(j)
          this.tableData._updateChangeSubscription();
          this.changeDetectorRefs.detectChanges();
        }
      }, 1000);
    }
  }

  clickedRow(student) {

    const dialogRef = this.dialog.open(ApplicantComponent, {
      width: '500px',
      height: 'auto',
      data: {
        // userId: uid,
        // courseId: courseid
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.getTurtorsAndCourse();
      // this.selectedCourse(this.courseId);
      // this.animal = result;
    });
    // let docId = student.docId;
    // let registeredDocId = student.studentCourseDocId;
    // let status;
    // if (!student.status) {
    //   status = true;
    // } else {
    //   console.log("The student is already registered....")
    //   status = false;
    // }

    // if (status) {
    //   this._apiService.updateStudentStatus(docId, registeredDocId, status);
    // }
  }

}


