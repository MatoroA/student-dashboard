import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, } from '@angular/forms'
import { ApiService } from 'src/app/backend/api.service';
import { Course } from 'src/app/models/course';
import { NewCourse } from 'src/app/models/new-course';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-add-new-course',
  templateUrl: './add-new-course.component.html',
  styleUrls: ['./add-new-course.component.scss']
})
export class AddNewCourseComponent implements OnInit {

  
  
  isLinear: any = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  course: NewCourse;
  dateCtrl : string;
  public imagePath;
  imgURL: any;
  public message: string;
  private isAdditionalRequirementClicked: boolean = false;
  package:any= [];
  ctrl:boolean;
  videoFile: string;
 

  requirments:any=[];
  firstFormMessages: any;
  private currentDate: Date;
  
  constructor(private _formBuilder: FormBuilder, private _apiService: ApiService) {
    
   }

  ngOnInit() {
    this.course = new NewCourse();
    this.currentDate = new Date();

    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      idCtrl:['',Validators.required],
      feeCtrl:['', Validators.required],
      startDate:['',Validators.required],
      endDate:['',Validators.required],
      desCtrl:['',Validators.required],
      depCtrl:['', Validators.required],
      closingDate: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      pakageItems: [''],
      requireItems:[''],
      include:[''],
      require:['']  
     
    });
    this.firstFormMessages = {
      'nameCtrl': [
        { type: 'required', message: 'Username is required' },
      ],
      'idCtrl': [
        { type: 'required', message: 'Course ID is required' },
      ],
      'feeCtrl': [
        { type: 'required', message: 'Course fee is required' },
      ],
      'depCtrl': [
        { type: 'required', message: 'Deposit is required' },
      ],
    }
  }

  onSubmit() {
    console.log(this.firstFormGroup.value)

    let name = this.firstFormGroup.get('nameCtrl').value;
    let id = this.firstFormGroup.get('idCtrl').value;
    let fees = this.firstFormGroup.get('feeCtrl').value;
    let startDate = this.firstFormGroup.get('startDate').value;
    let endDate = this.firstFormGroup.get('endDate').value;
    let description = this.firstFormGroup.get('desCtrl').value;
    let closingDate = this.firstFormGroup.get('closingDate').value;

    this.course.setCourseName(name);
    this.course.setCourseId(id);
    this.course.setCourseFee(fees);
    this.course.setStartDate(startDate);
    this.course.setEndDate(endDate);
    this.course.setClosingDate(closingDate);
    this.course.setDescription(description);

    console.log(this.course)
  }


  // secondForm() {
  //   let safety = this.secondFormGroup.get('safetyClothing').value;
  //   let learningMaterial = this.secondFormGroup.get('learningMaterial').value;
  //   let certificate = this.secondFormGroup.get('certificate').value;
  //   let placement = this.secondFormGroup.get('placement').value;
  //   let certifiedId = this.secondFormGroup.get('certifiedId').value;
  //   let registrationfee = this.secondFormGroup.get('registrationFee').value;
  //   let proofOfResidence = this.secondFormGroup.get('proofOfResidence').value;
  //   let qualificationLevel = this.secondFormGroup.get('qualificationLevel').value;

  //   safety? this.course.setReuirements('safety clothing') : '';
  //   learningMaterial? this.course.setReuirements('learning material') : '';
  //   certificate ? this.course.setReuirements('certificate') : '';
  //   placement ? this.course.setReuirements('placement') : '';
  //   registrationfee ? this.course.setReuirements(registrationfee) : '';
  //   certifiedId ? this.course.setReuirements('certified id') : '';
  //   proofOfResidence ? this.course.setReuirements('cv') : '';
  //   qualificationLevel ? this.course.setReuirements('NQF level 1 or grade 9') : '';

  //   console.log(this.course)

  //   for(let item of this.secondFormGroup.value.additional){

  //     let requirement = item.requirement.replace(/\s/g, "").toLowerCase();
  //     if( requirement != "" ){
  //       this.course.setReuirements(item.requirement);
  //     }
  //   }
  // }

  preview(files) {
    console.log(files);
    
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
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

    this.course.setImageName(fileName);
    this.course.setImageCover(file);

    console.log("This should run really well...");
    
  }


  uploadCourse(){

    for(let item of this.package){
      this.course.setFeesInclude(item);
    }
    for(let item of this.requirments){
      this.course.setReuirements(item);
    }

    console.log(this.course);

    if(this.videoFile != null){
      this.course.setCoverVideo(this.videoFile);
    }
    
    
    this._apiService.uploadCourse(this.course).then(results=>{
      console.log(results)
    })
  }
 
  addtoList(){
    console.log('okay')

    return this.package.push(this.secondFormGroup.get("include").value);
     
  }
  addtoList1(){

    return this.requirments.push(this.secondFormGroup.get("require").value);
    
  }
  endDate(endDate){

    
    let startDate = this.firstFormGroup.get('startDate').value;
    if(startDate > endDate){

      this.dateCtrl = "select a correct date";
      this.ctrl =false;
    }else{

      this.dateCtrl = " date is correct"
      this.ctrl = true;
    }

  }
  startDate(start){
    let end = this.firstFormGroup.get('endDate').value;
    if(start > end){

      this.dateCtrl = "select a correct date";
      this.ctrl =false;
    }else{

      this.dateCtrl = " date is correct"
      this.ctrl =true;
    }
  }

  videoFileSelected(files) {
    console.log(files);
    
    if (files.length === 0)
      return;
    const file = files[0];
    this.videoFile = file;
    console.log(this.videoFile);
    
  }
  
}


