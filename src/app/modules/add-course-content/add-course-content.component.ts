import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/backend/api.service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-course-content',
  templateUrl: './add-course-content.component.html',
  styleUrls: ['./add-course-content.component.scss']
})
export class AddCourseContentComponent implements OnInit {

  private course: Observable<Course[]> ;
  // private course: string = "";
  private imagePath: any;
  private message: string;
  private imgURL: any;
  private courseData: any;

  courseForm: FormGroup;

  constructor(private _apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit() {
    this.course = this._apiService.getCourses();


    this.courseForm = this.fb.group({
      content:[]
    })

  }

  selectedCourse(event){
    let courseId = event.value;

    this._apiService.getCourseDocument(courseId)
    .subscribe(result =>{
      this.courseData = result;
      console.log(result)
    })
  }
  
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type; 
    if (mimeType.match(/video\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    const file = files[0];
    console.log(file)
    const fileName = files[0].name;
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 

    }
  }

}
