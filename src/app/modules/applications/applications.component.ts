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
  private tableData = new MatTableDataSource<any>();
  enrolledArray: EnrolledStudent[] = [];
  isChecked: boolean = false;
  displayedColumns: string[] = ['applicant', 'course', 'Status', 'id', 'button'];
  pageSizeOptions;


  pageSizeArray: number[] = [5,3];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private _apiService: ApiService, private changeDetectorRefs: ChangeDetectorRef, public dialog: MatDialog) {

    this.course = this._apiService.getCourses();

  }
  async ngOnInit() {
    this._apiService.getCourses().subscribe(courseList => {
      this.enrolledArray = []
      console.log('one')
      for (let i = 0; i < courseList.length; i++) {
        let obj = new EnrolledStudent();
        obj.setCourseId(courseList[i].id);
        obj.setCourse(courseList[i]);
        this.enrolledArray.push(obj)
      }

      this._apiService.getStudentCourse().subscribe(enrolledList => {
        for (let course of this.enrolledArray) {
          course.clearStudentList();
          for (let student of enrolledList) {
            if (!student.status) {
              if (course.getCourseId() === student.courseID) {
                this._apiService.getStudentDoc(student.userID).subscribe(studentDoc => {
                  if (studentDoc != null) {
                    console.log(studentDoc);

                    studentDoc.studentCourseId = student.id;
                    studentDoc.status = student.status;
                    course.setStudentsList(studentDoc);
                  }
                });
              }
            }
          }
        }
        this.showAllStudents();
      });

    });
  }

  doSomething(event) {
    let selectedCourseId = event.value;
    let courseName;
    let index = 0;
    this.isChecked = false;

    this.tableData = new MatTableDataSource<any>();
    for (let item of this.enrolledArray) {
      courseName = item.getCourse().name;
      if (item.getCourseId() == selectedCourseId) {

        for (let j of item.getStudentsList()) {
          // console.log(j)
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
    let studentsCount = 0;

    let index = 0;
    // let i of this.enrolledArray
    for (let i = 0; i < this.enrolledArray.length; i++) {
      let courseName = this.enrolledArray[i].getCourse().name;
      // console.log(courseName)
      setTimeout(() => {

        for (let j of this.enrolledArray[i].getStudentsList()) {
          ++index;
          ++studentsCount;

          let obj = {
            position: index,
            firstName: j.firstName,
            lastName: j.lastName,
            cvUrl: j.cvUrl,
            idUrl: j.idUrl,
            course: courseName,
            docId: j.id,
            studentCourseDocId: j.studentCourseId,
            status: j.status,
            results: j.resultsUrl,
            proofOfPayments: j.proofOfPayUrl
          }

          console.log(obj);


          this.tableData.data.push(obj)
          
          // this.changeDetectorRefs.detectChanges();
        }





        if (++i == this.enrolledArray.length) {
          console.log('The last one...'+studentsCount);

          while (studentsCount > 0) {
            if(studentsCount - 5 >= 0){
              this.pageSizeArray.push(5);
              studentsCount -=5;
            } else {
              this.pageSizeArray.push(studentsCount);
              studentsCount = 0;
            }
          }

          setTimeout(() => {
            console.log(this.pageSizeArray);
            this.tableData._updateChangeSubscription();
          this.tableData.paginator = this.paginator;
            this.tableData._updateChangeSubscription();
          }, 2000);
        }
      }, 1000);

    }





  }

  clickedRow(docId: string, registeredDocId: string, status) {

    console.log(status);

    // console.log(student)
    // const dialogRef = this.dialog.open(ApplicantComponent, {
    //   width: '100vh',
    //   height: '80vh',
    //   data: {
    //     student: student
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   // this.getTurtorsAndCourse();
    //   // this.selectedCourse(this.courseId);
    //   // this.animal = result;
    // });
    if (!status) {
      status = true;
    } else {
      console.log("The student is already registered....")
      status = false;
    }

    // console.log(registeredDocId+'   '+docId)

    if (status) {
      this._apiService.updateStudentStatus(docId, registeredDocId, status);
    }
  }

  searchApplicant() {

    this.tableData.filter = this.searchKey.trim().toLowerCase();

  }
  onSearchClear() {
    this.searchKey = "";
    this.searchApplicant();
  }

  ngAfterViewInit() {
   
    this.tableData.paginator = this.paginator
}
}


