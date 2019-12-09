import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms'
import { ApiService } from 'src/app/backend/api.service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-add-new-course',
  templateUrl: './add-new-course.component.html',
  styleUrls: ['./add-new-course.component.scss']
})
export class AddNewCourseComponent implements OnInit {


  userForm: FormGroup;
  requirements: FormGroup;
  private file: File;
  private courseId: string;
  constructor(private formBuilder: FormBuilder, private _api: ApiService,
    private element: ElementRef) {
    this.requirements = this.formBuilder.group({
      additional: this.formBuilder.array([
        this.addingFields()
      ])
    });
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      course: [null, Validators.compose([Validators.required])],
      course_id: [null, Validators.compose([Validators.required])],
      duration: [null, Validators.compose([Validators.required])],
      period: [null, Validators.compose([Validators.required])],
      no: [null, Validators.compose([Validators.required])],
      registration_fee: [null, Validators.compose([Validators.required])],
      course_fee: [null, Validators.compose([Validators.required])]
    });
  }

  newCourseForm() {
    console.log(this.userForm.value)
    this._api.addCourse(this.userForm)
      .then(res => {
        this.courseId = res.id;
      }, error => {
        console.log(error)
      })
  }

  login() {
    this._api.signIn("a@g.com", "123456").then(user => {
      user.user.getIdTokenResult().then(idTokenResult => {
        console.log(idTokenResult.claims)
      })
    })
  }

  addingFields(): FormGroup {
    return this.formBuilder.group({
      requirement: ['', Validators.required]
    });

  }

  addNewInputField(): void {
    const control = <FormArray>this.requirements.controls.additional;
    control.push(this.addingFields());
  }

  removeInputField(i: number): void {
    const control = <FormArray>this.requirements.controls.additional;
    control.removeAt(i);
  }

  submitRequirements(form) {
    console.log(form.value)
  }

  changeListner(event) {
    var fullPath = event.srcElement.value
    this.file = event.target.files[0];
  }

  uploadFile() {
    this._api.uploadingImage("course", "1234", this.file).then(results => {
      console.log(results)
      results.ref.getDownloadURL().then(url => {
        console.log(url)
        this._api.updateCourseData(this.courseId, url).then(res => {
          console.log(res)
        })
      })
    })
  }

  getFileExtension(path: string): string{
    var name = path.substring(path.lastIndexOf('/')+1, path.length);
    name = name.split('%20').join(' ')
    let seperatedName = name.split('.')
    let extension = ''
    if (seperatedName.length > 1) {
      extension = '.' + seperatedName[1]
    }

    return extension;
  }
}
