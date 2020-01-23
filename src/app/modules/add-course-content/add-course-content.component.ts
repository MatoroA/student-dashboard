import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/backend/api.service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CourseData } from 'src/app/models/course-data';
import { ArrayList } from 'src/app/models/custom-arraylist';

@Component({
  selector: 'app-add-course-content',
  templateUrl: './add-course-content.component.html',
  styleUrls: ['./add-course-content.component.scss']
})
export class AddCourseContentComponent implements OnInit {

  private course: Observable<Course[]>;
  // private course: string = "";
  private imagePath: any;
  private message: string;
  private imgURL: any = null;
  private imgURL1: any = null;
  private courseData: any;

   courseArrayList: ArrayList;

   private isCourseSelected: boolean = false;
  courseForm: FormGroup;
  count: number = 0;

  constructor(private _apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit() {

    this.courseArrayList = new ArrayList();

    this.course = this._apiService.getCourses();
    this.courseForm = this.fb.group({
      content: this.fb.array([
        this.additionalNewContent()
      ]),
    })

  }

  additionalNewContent(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      audience: ['', Validators.required]
    });
  }

  addNewInputField(i: number): void {

    console.log('hhhhhhhhhhhh')

    this.count++;

    console.log(i)
    const control = <FormArray>this.courseForm.controls.content;
    control.push(this.additionalNewContent());

    console.log(i)
    let data: CourseData = new CourseData();
    data.setTitle(this.courseForm.value.content[i].title);
    data.setImgUrl(this.imgURL);
    data.setAudience("all");

    this.courseArrayList.add(data);
    console.log(this.courseArrayList.getImageAt(i))
    console.log(this.courseArrayList.getItemAt(i).getImgUrl())
    console.log(this.courseArrayList.getSize())

  }

  removeInputField(i: number, j: number): void {
    this.count--;
    const control = <FormArray>this.courseForm.controls.content;
    control.removeAt(i);

    this.courseArrayList.removeAt(i);
  }

  selectedCourse(event) {
    let courseId = event.value;
    // this.isCourseSelected = true;

    this._apiService.getCourseDocument(courseId)
      .subscribe(result => {
        this.courseData = result;
        console.log(result)
      })
  }

  uploadAll(i: number){

  }
  preview(files, i: number) {

    
    console.log()

    // let data: CourseData;

    // data.setAudience()

    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
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
    

      const control = <FormArray>this.courseForm.controls['content'];

      

      // this.courseForm.controls['content'].setValue('selected.id');

      console.log(control.get('preview'))

      console.log(this.courseForm)

    // this.courseForm.controls.preview.setValue({
    //   preview: this.imgURL
    // });
    
    // console.log(this.courseForm.controls.content.value[0].preview)
    // this.courseForm.patchValue({
    //   avatar: this.imgURL
    // });
    // this.courseForm.get('preview').updateValueAndValidity()
  }

}
