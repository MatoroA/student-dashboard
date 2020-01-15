import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/backend/api.service';
import { Trainer } from 'src/app/models/trainer';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';

export interface DialogData{
  userId: string;
  courseId: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  private userId: number = null;

  constructor() {
  }


  ngOnInit() {
  }

  userType(event){
    this.userId = event.value;
  }
}
