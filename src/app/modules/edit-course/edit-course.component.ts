import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  editForm: FormGroup;
  name:string;
  //array lists for packages and requirement
  package:any[]=['safety clothing','work pacement'];
  requirments:any[]=['proof of residence','nqf level 1']
  constructor( private db  :AngularFirestore) { 


   ;
  }
  ngOnInit() {
  }

  }

 
