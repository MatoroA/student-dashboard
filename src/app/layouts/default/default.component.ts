import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ApiService } from 'src/app/backend/api.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;
  adminPages = [
    { name: 'home', page: '' },
    { name: 'posts', page: 'posts' },
    { name: 'addTrainer', page: 'addTrainer' },
    { name: 'trainers', page: 'trainers' },
    { name: 'addNewCourse', page: 'addNewCourse' },
    { name: 'courses', page: 'courses' },
    { name: 'addCourseContent', page: 'addCourseContent' },
    { name: 'addAdmin', page: 'addAdmin' },
    { name: 'applications', page: 'applications' }
  ]

  tutorPages = [
    { name: 'home', page: '' },
    { name: 'addCourseContent', page: 'addCourseContent' },
    { name: 'applications', page: 'applications' }
  ]

  pagesToDisplay = [];
  constructor(public afAuth: AngularFireAuth, private _api: ApiService) { }

  ngOnInit() {

    this._api.signIn("a@g.com", "123456").then(user => {
      user.user.getIdTokenResult().then(idTokenResult => {
        console.log(idTokenResult.claims)

        if (idTokenResult.claims.admin) {
          this.pagesToDisplay = this.adminPages;

        }
        if (idTokenResult.claims.tutor) {

          this.pagesToDisplay = this.tutorPages;
        }
      })
    })
    // this.afAuth.auth.currentUser.getIdTokenResult().then(userType => {

    //   console.log(userType)
    // })

    // });

  }

  sideBarToggler() {

    this.sideBarOpen = !this.sideBarOpen
  }



}
