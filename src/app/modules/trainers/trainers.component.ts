import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ApiService } from 'src/app/backend/api.service';
import { Trainer } from 'src/app/models/trainer';
import { StoringUserDataService } from 'src/app/backend/storing-user-data.service';
import { UpdateTurtorComponent } from 'src/app/dialog/update-turtor/update-turtor.component';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss']
})
export class TrainersComponent implements OnInit {

  @Input() courseId: string;

  displayedColumns: string[] = ['Trainer_name', 'Course_training', 'Trainer_ID']
  dataSource = new MatTableDataSource<any>();
  pageSizeOptions;

  constructor(private _api: ApiService, public dialog: MatDialog, private _userData: StoringUserDataService) { }

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

        if (turtor.course != null) {
          let index = 0;
          for (let courseId of turtor.course) {
            ++index;
            obj.setCourseList(courseId);
          }
        }

        console.log(obj);
        
        this.dataSource.data.push(obj);
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  
  selectedCourse(course: Course) {
    this.courseId = course.id;

    console.log(course);
    

    this._userData.setCurrentCourse(course);
    console.log(this._userData);

  }
  turtorRowClicked(i) {
    console.log(i)
    this._userData.setSelectedUser(i);
    const dialogRef = this.dialog.open(UpdateTurtorComponent, {
      width: '500px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if(result != null){
        // this.getTurtorsAndCourse();
        // this.selectedCourse(this.currentCourse);
        // this.openSnackBar(result);
        // this.tableDataInfo();
      }
    });
  }
}
