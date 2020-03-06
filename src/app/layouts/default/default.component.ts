import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ApiService } from 'src/app/backend/api.service';
import { MatDialog } from '@angular/material';
import { PostNewsComponent } from 'src/app/dialog/post-news/post-news.component';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;
  adminPages = [
    { name: 'Home', page: 'home' , icon:'assignment'},
    //{ name: 'Add New Course', page: 'addNewCourse' },
    { name: 'Courses', page: 'courses' },
    { name: 'Add Course Content', page: 'addCourseContent' },
    { name: 'Add User', page: 'addUser' },
    { name: 'Applications', page: 'applications' },
    { name: 'Registered Students', page: 'posts'}
  ]

  tutorPages = [ 
    { name: 'Home', page: 'home' },
    { name: 'Applications', page: 'applications' },
    
    { name: 'Add New Course', page: 'addNewCourse' },
    {name : 'Register a Student', page: 'addUser'}
  ]

  pagesToDisplay = [];
  constructor(
    public afAuth: AngularFireAuth,public dialog: MatDialog,
     private _api: ApiService) { }

  ngOnInit() {
    this.pagesToDisplay = this.adminPages;
    // this._api.signIn("a@g.com", "123456").then(user => {
    //   user.user.getIdTokenResult().then(idTokenResult => {
    //     console.log(idTokenResult.claims)

    //     if (idTokenResult.claims.admin) {
    //       this.pagesToDisplay = this.adminPages;

    //     }
    //     if (idTokenResult.claims.tutor) {

    //       this.pagesToDisplay = this.tutorPages;
    //     }
    //   })
    // });
  }

  sideBarToggler() {

    this.sideBarOpen = !this.sideBarOpen
  }

  newsBtn(){
      const dialogRef = this.dialog.open(PostNewsComponent, {
        width: '650px',
        height: 'auto'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
  
        if(result != null){
          // this.getTurtorsAndCourse();
          // this.selectedCourse(this.currentCourse);
          // this.openSnackBar(result);
          // this.tableDataInfo();
        }
      });
    }

  


}
