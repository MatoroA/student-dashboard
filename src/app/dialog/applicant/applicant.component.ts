import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/modules/add-user/add-user.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var require: any

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss']
})
export class ApplicantComponent implements OnInit {

  private url: SafeResourceUrl;
  private pdfSrc: any;
  constructor(public dialogRef: MatDialogRef<ApplicantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
