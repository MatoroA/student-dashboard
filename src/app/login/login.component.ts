import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../backend/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private errorMessage: string = null;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private _authenticate: AuthService, private router: Router) { }

  ngOnInit() {
    // zombiejuice@email.com
    // 12!@ASas
    this.loginForm = this.fb.group({
      
      email: ['', Validators.required],
      pass:['', Validators.required]
    })
  }

  onSubmit(){

    let email: string = this.loginForm.value.email;
    let password: string = this.loginForm.value.pass;
    console.log(email+'  '+password)
    console.log(this.loginForm.value)

    this._authenticate.signIn(email, password).then(isAccessGranted=>{

      console.log(isAccessGranted);
      
      if(isAccessGranted){
        this.router.navigate(["default/home"])
      }else{
        this.errorMessage = "Access denied!";
      }
      
    },()=>{
      this.errorMessage = "Access denied!";
    })
  }
}
