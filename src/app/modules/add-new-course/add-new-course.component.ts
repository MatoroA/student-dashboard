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


  courseForm: FormGroup;
  requirements: FormGroup;
  private file: File;
  private courseId: string;
  private fileName: string;
  private isCourseRegistered: boolean = false;
  private displayCourseFiles: boolean = false;
  fileData: File = null;
  previewUrl: any = null;

  courseInclude: FormGroup

  private courseData$: Observable<Course>;
  constructor(private formBuilder: FormBuilder, private _api: ApiService,
    private element: ElementRef) {
    this.requirements = this.formBuilder.group({
      additional: this.formBuilder.array([
        this.addingFields()
      ])
    }); 

    this.courseInclude = this.formBuilder.group({
      feeInclude: this.formBuilder.array([
        this.addingFields()
      ])
    }); 
  }

  ngOnInit() {

    this.courseForm = this.formBuilder.group({
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
    console.log(this.courseForm.value)
    this._api.addCourse(this.courseForm)
      .then(res => { 
        this.courseId = res.id;
        console.log(res)
        this.isCourseRegistered = true;
      }, error => {
        console.log(error) 
      })
  }

  // login() {
  //   this._api.signIn("a@g.com", "123456").then(user => {
  //     user.user.getIdTokenResult().then(idTokenResult => {
  //       console.log(idTokenResult.claims)
  //     })
  //   })
  // }

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
    this._api.uploadCourseRequirements(form.value.additional, this.courseId)
    .then(()=>{
      this.displayCourseFiles = true
    },err=>{
      console.log(err)
    })
    
  }

  changeListner(event) {
    
    this.file = event.target.files[0];
    

    console.log(this.file)
  }

 

  getFileExtension(path: string): string {
    var name = path.substring(path.lastIndexOf('/') + 1, path.length);
    name = name.split('%20').join(' ')
    let seperatedName = name.split('.')
    let extension = ''
    if (seperatedName.length > 1) {
      extension = '.' + seperatedName[1]
    }

    return extension;
  }

  // addStudent() {
  //   console.log("oooo")
  //   this._api.addStudent("a@student.com", "123456");
  // }

  fileSelected(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    var fullPath = fileInput.srcElement.value;
    this.fileName = fullPath.replace(/^.*[\\\/]/, '');
    this.preview();
  }

  uploadFile() {
    this._api.uploadingImage("courses", this.courseId, this.fileName, this.fileData).then(results => {
      console.log(results)
      results.ref.getDownloadURL().then(url => {
        console.log(url);
        this._api.updateCourseDBData(this.courseId, url).then(res => {
          console.log(res)
        })
      })
    })
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

}
