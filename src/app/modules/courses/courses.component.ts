import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginatorModule, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  displayedColumns: string[]=['Course_name', 'Course_ID']
  dataSource = new MatTableDataSource<any>([{Course_name:'Course_name',Course_ID:'Course_ID'},
  {Course_name:'Course_name1',Course_ID:'Course_ID1'},{Course_name:'Course_name2',Course_ID:'Course_ID2'}])
  pageSizeOptions;
 
  constructor() { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
