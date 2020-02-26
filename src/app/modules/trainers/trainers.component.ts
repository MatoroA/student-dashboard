import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ApiService } from 'src/app/backend/api.service';
import { Trainer } from 'src/app/models/trainer';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss']
})
export class TrainersComponent implements OnInit {

  @Input() courseId: string;
  
  displayedColumns: string[]=['Trainer_name', 'Course_training', 'Trainer_ID']
  dataSource = new MatTableDataSource<any>([
  {Trainer_name:'Trainer name', Course_training:'Course training', Trainer_ID: 'trainer ID'},
  {Trainer_name:'Trainer_name1',Course_training:'Course_training1', Trainer_ID: 'trainer_ID1'},
  {Trainer_name:'Trainer-name2',Course_training:'Course_training2', Trainer_ID: 'trainer_ID2'}])
  pageSizeOptions;
 
  constructor( private _api: ApiService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    console.log(this.courseId);
    this.getTurtorsAndCourse()
  }

  private getTurtorsAndCourse() {
    this._api.getTurtors().subscribe(turtorsList => {
      console.log(turtorsList)
      console.log('turtor list is up top...');
      
      // this._userdata.setAllTurtors(turtorsList)
      let turtorObjects = [];
      for (let turtor of turtorsList) {
        let obj = new Trainer();
        obj.setId(turtor.uid);

        obj.setName(turtor.firstname);
        obj.setSurname(turtor.lastname);

        for (let courseId of turtor.course) {
          obj.setCourseList(courseId);
        }
        turtorObjects.push(obj);
        console.log(turtorObjects)
      }
    });
  }
}
