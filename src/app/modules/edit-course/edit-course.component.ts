import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { StoringUserDataService } from 'src/app/backend/storing-user-data.service';
import { Content } from '../../models/content-interface';
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
  private requirements: string[];
  private startDate: string;
  private endDate: string;
  private coverImage: string;
  private imageName: string;
  private code: string;
  private courseContentDb: Content[];
  private feesIncludes: string[];
  editForm: FormGroup;
  name:string;

  private course;
  constructor( private db  :AngularFirestore, private _storeData: StoringUserDataService) { 


   ;
  }
  ngOnInit() {
    let courseData = this._storeData.getClickedCourse();
    if( courseData != null){
      this.courseName = courseData.getCourseName() != null ? courseData.getCourseName(): '';
      this.courseFee = courseData.getCourseFee() != null ? courseData.getCourseFee(): '';
      this.courseId = courseData.getCode() != null ? courseData.getCode(): '';
      this.description = courseData.getDescription() != null ? courseData.getDescription(): '';
      this.requirements = courseData.getRequirements() != null ? courseData.getRequirements(): [];
      this.feesIncludes = courseData.getFeesInclude() != null ? courseData.getFeesInclude(): [];
      this.courseContentDb = courseData.getCourseContent() != null ? courseData.getCourseContent(): [];
      this.startDate = courseData.getStartDate() != null ? courseData.getStartDate(): '';
      this.endDate = courseData.getSEndDate() != null ? courseData.getSEndDate(): '';
    }

  }

  }

 
