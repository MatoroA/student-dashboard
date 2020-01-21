import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { Trainer } from '../models/trainer';
import { Turtor } from '../models/turtor';

@Injectable({
  providedIn: 'root'
})
export class StoringUserDataService {

  private currentCourseList: Course[] = []
  private AllTurtors: Turtor[] = [];

  constructor() { }


  setCurrentCourses(courses: Course[]) {
    this.currentCourseList = []
    this.currentCourseList = courses;
  }
  getCurrentCourses() {
    return this.currentCourseList;
  }

  setAllTurtors(turtors: Turtor[]) {
    this.AllTurtors = []
    this.AllTurtors = turtors;
  }
  getAllTurtors(): Turtor[] {
    return this.AllTurtors;
  }


}
