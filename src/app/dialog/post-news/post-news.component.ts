import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ApiService } from 'src/app/backend/api.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CourseData } from 'src/app/models/course-data';
import { Course } from 'src/app/models/course';
import { Message } from 'src/app/models/message';
import { CourseMessage } from 'src/app/models/binndingMeaageAndCourse';

@Component({
  selector: 'app-post-news',
  templateUrl: './post-news.component.html',
  styleUrls: ['./post-news.component.scss']
})
export class PostNewsComponent implements OnInit {

  private message: string = null;
  private title: string = null;
  private course: string = null;

  control = new FormControl();
  filteredCourses: Observable<Course[]>;
  courses: Course[];
  private isSendToAll: boolean = false;

  constructor(private dialogRef: MatDialogRef<PostNewsComponent>, private _apiService: ApiService) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this._apiService.getCourses().subscribe(listOfCourses => {
      console.log(listOfCourses);

      this.courses = listOfCourses;
      this.filteredCourses = this.control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });


  }

  private _filter(value: string): Course[] {
    console.log(value);
    console.log('andani matoro...');


    const filterValue = this._normalizeValue(value);
    return this.courses.filter(course => this._normalizeValue(course.name).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  checkBoxOnChange(event) {
    console.log(event.checked);
    this.isSendToAll = event.checked;

    if (this.isSendToAll) {
      this.control.setValue('sending to all courses')
    } else {
      this.control.setValue('')
    }

  }

  doSomething() {
    console.log('Andani matoro');

  }

  sendNews() {
    console.log(this.control.value);

    let messageObj = new Message();
    if (this.isSendToAll) {
      for (let course of this.courses) {
        // messageObj.setCourses(course.id);
        let courseMessages: CourseMessage = new CourseMessage();
        let news: CourseMessage[] = [];

        let messageObj: Message;

        if (course.news != null) {
          for (let courseNews of course.news) {
            messageObj = new Message();
            messageObj.setFormat(courseNews.format);
            messageObj.setMessage(courseNews.message);
            messageObj.setTitle(courseNews.title);
            courseMessages.setMessages(messageObj);
          }
        }

        let messageObj1: Message = new Message();
        messageObj1.setFormat('news');
        messageObj1.setMessage(this.message);
        messageObj1.setTitle(this.title);

        courseMessages.setCourseId(course.id);
        courseMessages.setMessages(messageObj1);

        news.push(courseMessages);

        console.log(news);
        
                  this._apiService.updateCourseNews(news);
      }
    } else {

      for (let course of this.courses) {
        if (course.name.toLocaleLowerCase() === this.control.value.toLocaleLowerCase()) {
          console.log(course);
          let courseMessages: CourseMessage = new CourseMessage();
          let news: CourseMessage[] = [];

          let messageObj: Message;

          if (course.news != null) {
            for (let courseNews of course.news) {
              messageObj = new Message();
              messageObj.setFormat(courseNews.format);
              messageObj.setMessage(courseNews.message);
              messageObj.setTitle(courseNews.title);
              courseMessages.setMessages(messageObj);
            }
          }

          let messageObj1: Message = new Message();
          messageObj1.setFormat('news');
          messageObj1.setMessage(this.message);
          messageObj1.setTitle(this.title);

          courseMessages.setCourseId(course.id);
          courseMessages.setMessages(messageObj1);

          news.push(courseMessages);

          console.log(news);


          // this._apiService.updateCourseNews(news);
        }
      }
    }

    messageObj.setTitle(this.title);
    messageObj.setMessage(this.message);
  }

  cancel() {
    this.dialogRef.close('it is canceled....')
  }

}
