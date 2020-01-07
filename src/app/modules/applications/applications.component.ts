import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  constructor() { }

  displayedColumns: string[]=['Applicant_name', 'Course_applied_for']
  dataSource = new MatTableDataSource<any>([
  {Applicant_name:'katlego Thongwane', Course_applied_for:'bricklaying'},
  {Applicant_name:'john doe', Course_applied_for:'plumbing'},
  {Applicant_name:'micky mouse', Course_applied_for:'electrical engineering'},
  {Applicant_name:'Stilo Magolide', Course_applied_for:'electrical engineering'},
  ])
  pageSizeOptions;
 
 

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
