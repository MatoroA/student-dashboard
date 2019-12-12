import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/backend/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  turtorForm: FormGroup;
  private allCourses$: Observable<Course[]>;
  private courseId: string;
  constructor(private formBuilder: FormBuilder, private _api: ApiService) { }


  ngOnInit() {
    this.allCourses$ = this._api.getCourses();
    console.log(this.allCourses$)
   this.turtorForm = this.formBuilder.group({
    firstname: [null, Validators.compose([Validators.required])],
     lastname: [null, Validators.compose([Validators.required])],
     email: [null, Validators.compose([Validators.required])],
     cellnumber: [null, Validators.compose([Validators.required])],
     idnumber:[null, Validators.compose([Validators.required])]
    });
  }

  newTurtorForm(){
    console.log(this.turtorForm.value)
    console.log(this.courseId)
  }


}
