import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { StoringUserDataService } from 'src/app/backend/storing-user-data.service';
import { Content } from '../../models/content-interface';
import { NewCourse } from '../../models/new-course';
import * as deepEqual from "deep-equal";


@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  private courseName: string;
  private courseFee: string;
  private courseId: string;
  private duration: string;
  private description: string;
  private requirements: string[] = [];
  private startDate: string;
  private endDate: string;
  private coverImage: string;
  private imageName: string;
  private code: string;
  private courseContentDb: Content[];
  private feesIncludes: string[] = [];
  private courseCover: string;
  private deposit: number = 0;
  private course;
  private courseData: NewCourse;
  private newData: NewCourse;
  private newRequirements: string = null;
  private newFeeInclude: string = null;

  imagePath;
  imgURL

  private courseForm: FormGroup;

  constructor(private db: AngularFirestore, private _storeData: StoringUserDataService,
    private _fb: FormBuilder) {
    this.courseForm = _fb.group({
      courseName: ['', Validators.required],
      courseFee: [, Validators.required],
      code: [, Validators.required],
      deposit: [, Validators.required],
      description: [, Validators.required]
    });
  }
  ngOnInit() {
    this.courseData = this._storeData.getClickedCourse();

    if (this.courseData != null) {
      this.courseName = this.courseData.getCourseName() != null ? this.courseData.getCourseName() : '';
      this.courseFee = this.courseData.getCourseFee() != null ? this.courseData.getCourseFee() : '';
      this.code = this.courseData.getCode() != null ? this.courseData.getCode() : '';
      this.description = this.courseData.getDescription() != null ? this.courseData.getDescription() : '';
      this.requirements = this.courseData.getRequirements() != null ? this.courseData.getRequirements() : [];
      this.feesIncludes = this.courseData.getFeesInclude() != null ? this.courseData.getFeesInclude() : [];
      this.courseContentDb = this.courseData.getCourseContent() != null ? this.courseData.getCourseContent() : [];
      this.startDate = this.courseData.getStartDate() != null ? this.courseData.getStartDate() : '';
      this.endDate = this.courseData.getSEndDate() != null ? this.courseData.getSEndDate() : '';
      this.courseCover = this.courseData.getCourseCover() != null ? this.courseData.getCourseCover() : '';
      this.deposit = this.courseData.getDeposit() != null ? this.courseData.getDeposit() : 0;
      this.courseData.setDeposit(this.deposit);

      this.courseForm.setValue({
        courseName: this.courseName,
        courseFee: this.courseFee,
        code: this.code,
        deposit: this.deposit,
        description: this.description,
      });
    }

    console.log(this.newData)
  }
  onSubmit() {
    console.log(this.courseForm.value);
  }

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = "Only images are supported.";
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

    console.log(file)
  }

  addMore() {
    if (this.newRequirements != null) {
      this.requirements.push(this.newRequirements);
      this.newRequirements = null;
    } else if (this.newFeeInclude != null) {
      this.feesIncludes.push(this.newFeeInclude)
      this.newFeeInclude = null;
    }
  }

  remove(i: number, index: number) {
    if (i == 0) {
      this.feesIncludes.splice(index, 1);
    } else { 
      this.requirements.splice(index, 1);
    }
  }
  private changes() {

    this.newData = new NewCourse();
    this.courseData.setArrayFeeIncludes(this.feesIncludes);
    this.courseData.setArrayRequirements(this.requirements);


    console.log(this.courseData);
  }

}


