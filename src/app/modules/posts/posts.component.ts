import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/backend/api.service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { EnrolledStudent } from 'src/app/models/enrolledStudents';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  displayedColumns: string[] = ['student_name', 'course_name', 'course_ID']
  dataSource = new MatTableDataSource<any>([
    { student_name: 'first person', course_name: 'first course', course_ID: 'first course id' },
    { student_name: 'first person', course_name: 'first course', course_ID: 'first course id' }]);
  pageSizeOptions;

  private registeredStudents: EnrolledStudent[] = [];
  private tableData = new MatTableDataSource<any>();
  constructor(private _apiService: ApiService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this._apiService.getCourses()
      .subscribe(courseList => {
        for (let course of courseList) {
          let item: EnrolledStudent = new EnrolledStudent();
          item.setCourse(course);
          item.setCourseId(course.id);
          this.registeredStudents.push(item);
        }
        this._apiService.getRegisteredStudent().subscribe(registeredList => {
          for (let student of registeredList) {
            for (let course of this.registeredStudents) {
              if (course.getCourseId() == student.courseID) {
                this._apiService.getStudentDoc(student.userID).subscribe(studentDoc => {
                  course.setStudentsList(studentDoc);
                });
                break;
              }
            }
          }
          this.showAllStudents(this.registeredStudents);
        })
      })
  }

  showAllStudents(studentList: EnrolledStudent[]) {
    this.tableData = new MatTableDataSource<any>();
    for (let i of studentList) {
      let courseName = i.getCourse().name;
      console.log(courseName)
      setTimeout(() => {
        for (let j of i.getStudentsList()) {
          console.log(j)
          let obj = {
            firstName: j.firstName,
            lastName: j.lastName,
            courseName: courseName
          }
          this.tableData.data.push(obj)
          this.tableData._updateChangeSubscription();
          // this.changeDetectorRefs.detectChanges();
        }
      }, 1000);
    }
  }
}
