import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/backend/api.service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CourseData } from 'src/app/models/course-data';
import { ArrayList } from 'src/app/models/custom-arraylist';
import { OpenFileComponent } from 'src/app/dialog/open-file/open-file.component';
import { MatDialog } from '@angular/material';
import { NewCourse } from 'src/app/models/new-course';

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
  private fileName: string;
   courseArrayList: ArrayList;
   private file: string;

   private isCourseSelected: boolean = false;
  courseForm: FormGroup;
  count: number = 0;
  format: any;
  url: any;
  selectedCourseInfo: NewCourse;

  constructor(private _apiService: ApiService, private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit() {

    this.courseArrayList = new ArrayList();
    this.selectedCourseInfo = new NewCourse();

    this.course = this._apiService.getCourses();
    this.courseForm = this.fb.group({
      // content: this.fb.array([
      //   this.additionalNewContent()
      // ]),
      pdfTitle: ['', Validators.required],
      vTitle:['', Validators.required]
    })

  }

  additionalNewContent(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      audience: ['', Validators.required]
    });
  }

  addNewInputField(i: number): void {
    const control = <FormArray>this.courseForm.controls.content;
    control.push(this.additionalNewContent());

    console.log(i)
    let data: CourseData = new CourseData();
    data.setFile(this.url);
    data.setFormat(this.format);
    data.setFileName(this.fileName);
    data.setFileUrl(this.file);
    this.courseArrayList.add(data);

    this.url = null;
    this.format = null;
    this.fileName = null;
    this.file = null;
  }

  removeInputField(i: number): void {
    const control = <FormArray>this.courseForm.controls.content;
    control.removeAt(i);
    this.courseArrayList.removeAt(i);
  }

  selectedCourse(event) {
    let courseId = event.value;
    this.isCourseSelected = true;

    this._apiService.getCourseDocument(courseId)
      .subscribe(result => {
        this.courseData = result;
        this.selectedCourseInfo.setCourseName(result.name);
        this.selectedCourseInfo.setCourseId(courseId);
        console.log(result.contents);

        if(result.contents != null){
          for(let item of result.contents){
            this.selectedCourseInfo.setCourseContent(item);
          }
        }

        
        console.log(result)
      })
  }

  uploadAll(i: number){

  }
  preview(files, i: number) {
    if (files.length === 0)
      return;
    const file = files[0];
    this.file = file;
    this.fileName = file.name;
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
      } else if(file.type.indexOf('video')> -1){
        this.format = 'video';
      } else if(file.type.indexOf('pdf')> -1){
        this.format = 'pdf';
      }

      console.log(this.format)
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
  }

  openPdfFile(url){
    const dialogRef = this.dialog.open(OpenFileComponent, {
      width: 'auto',
      height: 'auto',
      maxHeight: '90vh',
      data: {
        file: url
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.getTurtorsAndCourse();
      // this.selectedCourse(this.courseId);
      // this.animal = result;
    });

  }
  submitForm(){
    for(let j = 0; j < this.courseForm.value.content.length; j++){

      if(this.courseArrayList.getItemAt(j) != null){
        this.courseArrayList.getItemAt(j).setTitle(this.courseForm.value.content[j].title);
        this.courseArrayList.getItemAt(j).setAudience(this.courseForm.value.content[j].audience);
      } else {
        let data: CourseData = new CourseData();
        data.setFile(this.url);
        data.setFormat(this.format);
        data.setFileName(this.fileName);
        data.setTitle(this.courseForm.value.content[j].title);
        data.setAudience(this.courseForm.value.content[j].audience);
        data.setFileUrl(this.file);
        this.courseArrayList.add(data);

        console.log(this.fileName)
        this.url = null;
        this.file = null;
       
      }
    }

    this._apiService.uploadFiles( this.selectedCourseInfo ,this.courseArrayList);
    console.log(this.courseArrayList.getAll())
  }

  onConsoleLog(){

    let name = this.courseForm.get('title').value;
    console.log(name);
  }
}
