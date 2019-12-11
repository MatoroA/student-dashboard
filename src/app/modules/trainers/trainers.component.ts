import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss']
})
export class TrainersComponent implements OnInit {

  displayedColumns: string[]=['Trainer_name', 'Course_training', 'Trainer_ID']
  dataSource = new MatTableDataSource<any>([
  {Trainer_name:'Trainer name', Course_training:'Course training', Trainer_ID: 'trainer ID'},
  {Trainer_name:'Trainer_name1',Course_training:'Course_training1', Trainer_ID: 'trainer_ID1'},
  {Trainer_name:'Trainer-name2',Course_training:'Course_training2', Trainer_ID: 'trainer_ID2'}])
  pageSizeOptions;
 
  constructor() { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
