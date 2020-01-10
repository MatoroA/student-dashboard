import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ApiService } from 'src/app/backend/api.service';
import { EnrolledStudent } from 'src/app/models/enrolledStudents';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  course: any;
  private coursesAndStudent: any = [];
  sId;
  constructor(private _apiService : ApiService) {

    this.course = this._apiService.getCourses(); 
    
   }

  displayedColumns: string[]=this.coursesAndStudent;
  dataSource = new MatTableDataSource<any>([
  {Applicant_name:'katlego Thongwane', Course_applied_for:'bricklaying'},
  {Applicant_name:'john doe', Course_applied_for:'plumbing'},
  {Applicant_name:'micky mouse', Course_applied_for:'electrical engineering'},
  {Applicant_name:'Stilo Magolide', Course_applied_for:'electrical engineering'},
  ])

  private tableData = [];
  pageSizeOptions;


  displayedColumns2: string[]=this.coursesAndStudent
  dataSource2 = new MatTableDataSource<any>(this.coursesAndStudent)
  pageSizeOptions2;
 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    let studentCourse = [];
    let enrolledArray = [];

    this._apiService.getCourses().subscribe(courseList=>{
          for(let i =0; i < courseList.length; i++){
            let obj = new EnrolledStudent();
            obj.setCourseId(courseList[i].id);
            obj.setCourse(courseList[i]);
            enrolledArray.push(obj)
          }

          console.log(courseList)
        
    });

    this._apiService.getStudentCourse().subscribe(enrolledList =>{

      for(let item of enrolledList){
          for(let j =0; j < enrolledArray.length; j++ ){
            if(enrolledArray[j].getCourseId() === item.courseID){
              this._apiService.getStudentDoc(item.userID).subscribe(docItem=>{
                enrolledArray[j].setStudent(docItem)
              })
            }
          }
      }

      this.coursesAndStudent = enrolledArray;
      for(let i of this.coursesAndStudent){
        let courseName = i.course.name;
        console.log(i.students)
        for(let j = 0; j < i.students.length ; j++){

          let obj = {
            Applicant_name: i.students[j].firstName +' '+i.students[j].firstName,
            Course_applied_for: courseName
          }
          this.tableData.push(obj)
        }
      }

      console.log(this.tableData)
    });

  }




}
