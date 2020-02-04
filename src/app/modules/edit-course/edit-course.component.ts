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
  constructor( private db  :AngularFirestore) { 


    // this.db.collection("courses").doc(this.key)
    // .get().subscribe((doc)  =>{
    //   if (doc.exists) {
    //     console.log("Document data:", doc.data());
    //     this.interTime = doc.data().service.Time;
     
        
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // });
  }
  ngOnInit() {
  }

  }

 
