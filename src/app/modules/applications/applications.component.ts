import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ApiService } from 'src/app/backend/api.service';
import { EnrolledStudent } from 'src/app/models/enrolledStudents';
import { Observable } from 'rxjs';

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
  displayedColumns: string[] = ['position','applicant', 'course', 'cellphone', 'Staus'];
  pageSizeOptions;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _apiService: ApiService) {

    this.course = this._apiService.getCourses();
  
  }
  async ngOnInit() {
    this._apiService.getCourses().subscribe(courseList => {
      for (let i = 0; i < courseList.length; i++) {
        let obj = new EnrolledStudent();
        obj.setCourseId(courseList[i].id);
        obj.setCourse(courseList[i]);
        this.enrolledArray.push(obj)
      }
    });

    this._apiService.getStudentCourse().subscribe(enrolledList => {
      for (let item of enrolledList) {
        for (let j = 0; j < this.enrolledArray.length; j++) {
          if (this.enrolledArray[j].getCourseId() === item.courseID) {
            this._apiService.getStudentDoc(item.userID).subscribe(studentDoc => {
              this.enrolledArray[j].setStudentsList(studentDoc)
            })
          }
        }
      }

      this.showAllStudents()
     
    });
  }

  doSomething(event){
    let selectedCourseId = event.value;
    let courseName;
    let index = 0;
    this.isChecked = false;

    this.tableData = new MatTableDataSource<any>();
    for(let item of this.enrolledArray){
      courseName = item.getCourse().name;
      if(item.getCourseId() == selectedCourseId){
        
        for (let j of item.getStudentsList()) {
          console.log(item.getStudentsList())
          ++index;
          let obj = {
            name: j.firstName + ' ' + j.lastName,
            course: courseName,
            cellphone: j.cellNumber,
            cv: j.cvUrl,
            position: index
          }
          this.tableData.data.push(obj)
          this.tableData._updateChangeSubscription();
        }
      }
    }
  }

  showAllStudents(){
    this.tableData = new MatTableDataSource<any>();
    this.isChecked = true;

    let index = 0;
      for (let i of this.enrolledArray) {
        console.log(i)
        let courseName = i.getCourse().name;
        setTimeout(()=> {
          for (let j of i.getStudentsList()) {
            ++index;
            console.log(i.getStudentsList())
            let obj = {
              name: j.firstName + ' ' + j.lastName,
              course: courseName,
              cellphone: j.cellNumber,
              cv: j.cvUrl,
              position: index
            }
            this.tableData.data.push(obj)
            this.tableData._updateChangeSubscription();
          }
        }, 1000);
      }
    
  }

}


