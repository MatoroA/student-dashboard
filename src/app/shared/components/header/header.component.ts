import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { AuthService } from 'src/app/backend/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter()
  constructor(private _apiService:  AuthService, private router: Router) { }

  ngOnInit() {}

  toggleSideBar(){
    this.toggleSideBarForMe.emit();
  }

  signOut(){
    this._apiService.signOut();
    
    this.router.navigateByUrl("");
  }

}
