import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  hidePassword = true;
  hidePasswordc1=true;
  hidePasswordc2=true;
  showtable: boolean = false;
  constructor(private _dialog: MatDialog, private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginform = this._fb.group({
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      username: ['', [Validators.minLength(4), Validators.required]],
      password: ['', [Validators.minLength(4), Validators.required]],
      email:['',Validators.required],
      contact_number:['',Validators.required],
      role:['',Validators.required],
    });
  }
  showform() {
    if (this.showtable == false) {
      this.showtable = true;
    } else {
      this.showtable = false;
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;


  }
  togglePasswordVisibility1() {
    this.hidePasswordc1 = !this.hidePasswordc1;

  }
  togglePasswordVisibility2() {
    this.hidePasswordc2 = !this.hidePasswordc2;

  }
  pass:any;
  pass1:any;
  confirmPass(){
    if(this.pass!==this.pass1){
      alert("password  not same")
    }

  }
  
  onSubmit() {
    if (this.loginform.valid) {
      let data = this.loginform.value;
      console.log(data);
      alert('Login Sucessfully');
      this.showtable = false;


      //.subscribe(res =>{
      // localStorage.setItem('token',res.token)})
    }
  }
}
