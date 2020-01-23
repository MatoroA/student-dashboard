import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/backend/api.service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  displayedColumns: string[]=['student_name','course_name', 'course_ID' ]
  dataSource = new MatTableDataSource<any>([
  {student_name:'first person', course_name:'first course', course_ID:'first course id'},
  {student_name:'first person', course_name:'first course', course_ID:'first course id'}]);
  pageSizeOptions;
 
  constructor(private _apiService: ApiService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    
  }

}
