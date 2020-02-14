import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginatorModule, MatPaginator, MatDialog } from '@angular/material';
import { ApiService } from 'src/app/backend/api.service';
import { Router } from '@angular/router';
import { Course } from '../../models/course';
import { NewCourse } from '../../models/new-course';
import { StoringUserDataService } from 'src/app/backend/storing-user-data.service';
import { DeleteCourseComponent } from 'src/app/dialog/delete-course/delete-course.component';

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
  private dataSource = new MatTableDataSource<Course>();

  private courseListInfo: Course[] = []

  pageSizeOptions;

  constructor(private _apiService: ApiService, private router: Router,
     private _storeData: StoringUserDataService, public dialog: MatDialog) { }

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
      this.dataSource = new MatTableDataSource<Course>();
      let index = 0;
      for (let course of courseList) {

        this.dataSource.data.push(course);
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

  getRecord(clickedRow: Course) {
    console.log(clickedRow)

    let courseClicked: NewCourse = new NewCourse();
    courseClicked.setCourseId(clickedRow.id);
    courseClicked.setCourseName(clickedRow.name);
    courseClicked.setDescription(clickedRow.description);
    // courseClicked.setDuration(clickedRow.duration);
    courseClicked.setCode(clickedRow.code);
    courseClicked.setCourseFee(clickedRow.fee);
    courseClicked.setDeposit(clickedRow.deposit);
    courseClicked.setCouresUrl(clickedRow.coverUrl);
    courseClicked.setArrayRequirements(clickedRow.requirements);
    courseClicked.setArrayFeeIncludes(clickedRow.feeInclude);
    courseClicked.getCourseContent() != null ? courseClicked.setArrayCourseContentDb(clickedRow.contents): courseClicked.setArrayCourseContentDb([]);


    this._storeData.setClickedCourse(courseClicked);
    console.log(courseClicked)
    this.router.navigateByUrl("default/editCourse");
    //this.router.navigate(["default/editCourse"], { queryParams: { order: id } });
  }

  deleteCourse(course: Course){

    this._storeData.setCurrentCourse(course);
    const dialogRef = this.dialog.open(DeleteCourseComponent, {
      width: '500px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.getTurtorsAndCourse();
      // this.selectedCourse(this.currentCourse);
      // this.openSnackBar(result);
      // this.tableDataInfo();
    });
  }


}
