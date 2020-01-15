import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { ApiService } from 'src/app/backend/api.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {
  turtorForm: FormGroup;
  private allCourses$: Observable<Course[]>;
  
  
  constructor(private formBuilder: FormBuilder, private _api: ApiService, public dialog: MatDialog) {
    this.allCourses$ = this._api.getCourses();
    this.allCourses$ = this._api.getCourses();
    console.log(this.allCourses$)
   this.turtorForm = this.formBuilder.group({
    firstname: [null, Validators.compose([Validators.required])],
     lastname: [null, Validators.compose([Validators.required])],
     email: [null, Validators.compose([Validators.required])],
     cellnumber: [null, Validators.compose([Validators.required])],
     idnumber:[null, Validators.compose([Validators.required])],
     gender:[null, Validators.compose([Validators.required])]
    });
   }

  ngOnInit() {
  }

}
