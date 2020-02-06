import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { Trainer } from '../models/trainer';
import { Turtor } from '../models/turtor';
import { NewCourse } from '../models/new-course';

@Injectable({
  providedIn: 'root'
})
export class StoringUserDataService {

  private currentCourse: Course;
  private selectedTurtor: Trainer;
  private clickedCourse: NewCourse;

  constructor() { }

  setSelectedUser(turtor: Trainer){
    this.selectedTurtor = turtor;
  }

  getSelectedUser(){
    return this.selectedTurtor;
  }

  setCurrentCourse(courses: Course) {
    this.currentCourse = courses;
  }
  getCurrentCourse() {
    return this.currentCourse;
  }

  setClickedCourse(course: NewCourse){
    this.clickedCourse = course;
  }

  getClickedCourse(){
    return this.clickedCourse;
  }
}

