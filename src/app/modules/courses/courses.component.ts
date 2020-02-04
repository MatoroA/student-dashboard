import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginatorModule, MatPaginator} from '@angular/material';
import { ApiService } from 'src/app/backend/api.service';
import { Router } from '@angular/router';

export interface Data{
    code: string;
    name: string;
    id: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  displayedColumns: string[]=['Course_name', 'Course_ID']
  private dataSource = new MatTableDataSource<Data>();
  pageSizeOptions;
 
  constructor(private _apiService: ApiService, private router: Router ) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.getCourses();
  }

  private getCourses(){
    this._apiService.getCourses().subscribe(courseList=>{
      this.dataSource = new MatTableDataSource<Data>();
      for(let course of courseList){
        let data = {
          code: course.code,
          name: course.name,
          id: course.id
        }
        this.dataSource.data.push(data);
      }
    });
  }

  searchCourse(filterValue: string){
    filterValue = filterValue.trim();
    filterValue =  filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  getRecord(clickedRow: Data){
    console.log(clickedRow.id)
    let id = clickedRow.id;
    this.router.navigateByUrl("default/editCourse");
    //this.router.navigate(["default/editCourse"], { queryParams: { order: id } });
  }
}
