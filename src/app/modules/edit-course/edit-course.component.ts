import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
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
  editForm: FormGroup;
  name: string;
  private courseCover: string;
  private deposit: number = 0;
  private course;
  private courseData: NewCourse;
  private newData: NewCourse;
  private newRequirements: string = null;
  private newFeeInclude: string = null;

  private requirementsArray: string[] = [];
  private feeIncludesArray: string[] = [];

  constructor(private db: AngularFirestore, private _storeData: StoringUserDataService) {
  }
  ngOnInit() {
    this.newData = new NewCourse();
    this.courseData = this._storeData.getClickedCourse();

    if (this.courseData != null) {
      this.courseName = this.courseData.getCourseName() != null ? this.courseData.getCourseName() : '';
      this.courseFee = this.courseData.getCourseFee() != null ? this.courseData.getCourseFee() : '';
      this.courseId = this.courseData.getCode() != null ? this.courseData.getCode() : '';
      this.description = this.courseData.getDescription() != null ? this.courseData.getDescription() : '';
      this.requirements = this.courseData.getRequirements() != null ? this.courseData.getRequirements() : [];
      this.feesIncludes = this.courseData.getFeesInclude() != null ? this.courseData.getFeesInclude() : [];
      this.courseContentDb = this.courseData.getCourseContent() != null ? this.courseData.getCourseContent() : [];
      this.startDate = this.courseData.getStartDate() != null ? this.courseData.getStartDate() : '';
      this.endDate = this.courseData.getSEndDate() != null ? this.courseData.getSEndDate() : '';
      this.courseCover = this.courseData.getCourseCover() != null ? this.courseData.getCourseCover() : '';
      this.deposit = this.courseData.getDeposit() != null ? this.courseData.getDeposit() : 0;

      this.feeIncludesArray = this.courseData.getFeesInclude();
      this.requirementsArray =  this.courseData.getRequirements();
    }
  }

  addMore() {
    if (this.newRequirements != null) {
      this.requirementsArray.push(this.newRequirements);
      this.newRequirements = null;
    } else if (this.newFeeInclude != null) {
      this.feeIncludesArray.push(this.newFeeInclude);
      this.newFeeInclude = null;
    }
  }

  private changes() {
    this.newData.setCourseName(this.courseName);
    this.newData.setCourseFee(this.courseFee);
    this.newData.setCode(this.courseId);
    this.newData.setDescription(this.description);
    this.newData.setEndDate(this.endDate);
    this.newData.setStartDate(this.startDate);
    this.newData.setCode(this.code);
    this.newData.setDuration(this.duration);
    this.newData.setArrayCourseContentDb(this.courseContentDb);
    this.newData.setDeposit(this.deposit);
    this.newData.setArrayFeeIncludes(this.feeIncludesArray);
    this.newData.setArrayRequirements(this.requirementsArray);
    this.newData.setCouresUrl(this.courseCover);
    console.log(deepEqual(this.courseData , this.newData));

    console.log(this.courseData , this.newData);
  }

}


