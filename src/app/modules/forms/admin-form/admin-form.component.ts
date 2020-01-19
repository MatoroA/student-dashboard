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
  

  form: FormGroup;
  
  constructor(private fb: FormBuilder) {
   }

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(40)]],
      surname: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
      cellphone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]]
    })
  }

  onSubmit(){
    console.log(this.form)
  }

}
