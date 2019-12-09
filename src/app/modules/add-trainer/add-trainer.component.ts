import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/backend/api.service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.scss']
})
export class AddTrainerComponent implements OnInit {

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
     cellnumber: [null, Validators.compose([Validators.required])]
    });
  }

  newTurtorForm(){
    console.log(this.turtorForm.value)
    console.log(this.courseId)
  }

} 
