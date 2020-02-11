import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      
      email: ['', Validators.required],
      pass:['', Validators.required]
    })
  }

  onSubmit(){
    console.log(this.loginForm.get('email').value);
    console.log(this.loginForm.get('pass').value)
  }
}
