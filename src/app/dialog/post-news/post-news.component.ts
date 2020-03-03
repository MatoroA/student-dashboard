import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ApiService } from 'src/app/backend/api.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { CourseData } from 'src/app/models/course-data';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-post-news',
  templateUrl: './post-news.component.html',
  styleUrls: ['./post-news.component.scss']
})
export class PostNewsComponent implements OnInit {

  private message: string = null;
  private title: string = null;
  private course: string = null;

  control = new FormControl();
  streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredStreets: Observable<Course[]>;
  courses: Course[];
  


  constructor(private dialogRef: MatDialogRef<PostNewsComponent>, private _apiService: ApiService) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {

    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this._apiService.getCourses().subscribe(listOfCourses =>{
      this.courses  = listOfCourses;
      console.log(listOfCourses);
      
    }) 
  }

  private _filter(value: string): Course[] {
    console.log(value);
    
    const filterValue = this._normalizeValue(value);
    return this.courses.filter(street => this._normalizeValue(street.code).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  sendNews() {
    console.log(this.message);
    console.log(this.title);
    
  }

  cancel(){
    this.dialogRef.close('it is canceled....')
  }

}
