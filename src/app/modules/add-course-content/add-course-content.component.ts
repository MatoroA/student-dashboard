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
  private courseData: any;
  private fileName: string;
  courseArrayList: ArrayList;
  private pdfFile: string;
  private videoFile: string;

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
      pdfTitle: [''],
      pdfAudience: [''],
      vTitle: [''],
      vAudience: ['']
    });

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

        if (result.contents != null) {
          for (let item of result.contents) {
            this.selectedCourseInfo.setCourseContent(item);
          }
        }
      });
  }

  pdfFileSelected(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.pdfFile = fileInput.target.files[0];
      console.log(this.pdfFile);
      
    }

  }

  videoFileSelected(files) {
    if (files.length === 0)
      return;
    const file = files[0];

    this.videoFile = file;
  }

  onSubmit() {
    this.courseArrayList = new ArrayList();
    let pdfTitle: string = this.courseForm.value.pdfTitle;
    let videoTitle: string = this.courseForm.value.vTitle;


    if (this.pdfFile != "" && pdfTitle != "") {
      let pdfData: CourseData = new CourseData();
      let audience = this.courseForm.value.pdfAudience == "" ? "all" : this.courseForm.value.pdfAudience;
      pdfData.setTitle(pdfTitle);
      pdfData.setFile(this.pdfFile);
      pdfData.setFormat("pdf");
      pdfData.setAudience(audience);
      pdfData.setFileUrl(this.pdfFile);
      pdfData.setFileName(pdfTitle)
      this.courseArrayList.add(pdfData);
      console.log(pdfData);

    }
    if (this.videoFile != "" && videoTitle != "") {
      let videoData: CourseData = new CourseData();
      let audience = this.courseForm.value.vAudience == "" ? "all" : this.courseForm.value.vAudience;
      videoData.setTitle(videoTitle);
      videoData.setFile(this.videoFile);
      videoData.setFormat("video");
      videoData.setAudience(audience);
      videoData.setFileUrl(this.videoFile);
      videoData.setFileName(videoTitle)
      console.log(videoData)
      this.courseArrayList.add(videoData);
    }

    console.log(this.courseArrayList.getAll());
    

    this._apiService.uploadFiles(this.selectedCourseInfo, this.courseArrayList).then(success=>{
      console.log(success);
    }, error =>{
      console.log(error);
      
    })
  }
}
