import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginatorModule, MatPaginator } from '@angular/material';
import { ApiService } from 'src/app/backend/api.service';
import { Router } from '@angular/router';
import { Course } from '../../models/course';
import { NewCourse } from '../../models/new-course';
import { StoringUserDataService } from 'src/app/backend/storing-user-data.service';

export interface Data {
  code: string;
  name: string;
  id: string;
  position: number
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  searchKey: string;
  displayedColumns: string[] = ['Course_name', 'Course_ID', 'action']
  private dataSource = new MatTableDataSource<Data>();

  private courseListInfo: Course[] = []

  pageSizeOptions;

  constructor(private _apiService: ApiService, private router: Router, private _storeData: StoringUserDataService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.getCourses();
  }

  private getCourses() {
    this._apiService.getCourses().subscribe(courseList => {

      this.courseListInfo = courseList;
      console.log(courseList)
      this.dataSource = new MatTableDataSource<Data>();
      let index = 0;
      for (let course of courseList) {
        let data = {
          code: course.code,
          name: course.name,
          id: course.id,
          position: index
        }
        this.dataSource.data.push(data);

        ++index;
      }
    });
  }

  searchCourse() {
    // filterValue = filterValue.trim();
    // filterValue =  filterValue.toLocaleLowerCase();
    // this.dataSource.filter = filterValue;
    this.dataSource.filter = this.searchKey.trim().toLowerCase();

  }
  onSearchClear() {
    this.searchKey = "";
    this.searchCourse();
  }

  getRecord(clickedRow: Data) {
    console.log(clickedRow)
    let id = clickedRow.id;
    console.log(this.courseListInfo[clickedRow.position])
    let course = this.courseListInfo[clickedRow.position];

    let courseClicked: NewCourse = new NewCourse();
    courseClicked.setCourseName(course.name);
    courseClicked.setDescription(course.description);
    courseClicked.setDuration(course.duration);
    courseClicked.setCode(course.code);
    courseClicked.setCourseFee(course.fee);

    if (course.feesInclude != null) {
      for (let item of course.feesInclude) {
        courseClicked.setFeesInclude(item);
      }
    }

    if (course.requirements != null) {
      for (let item of course.requirements) {
        courseClicked.setReuirements(item);
      }

    }

    if (course.contents != null) {
      for (let item of course.contents) {
        courseClicked.setCourseContent(item);
      }

    }



    this._storeData.setClickedCourse(courseClicked);

    this.router.navigateByUrl("default/editCourse");
    //this.router.navigate(["default/editCourse"], { queryParams: { order: id } });
  }


}
