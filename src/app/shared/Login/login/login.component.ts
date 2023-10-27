import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServicesService } from 'src/app/core/services.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  registerform!: FormGroup;
  hidePassword = true;
  hidePasswordc1 = true;
  hidePasswordc2 = true;
  showtable: boolean = false;
  constructor(
    private _dialog: MatDialog,
    private _fb: FormBuilder,
    public _servicesService: ServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginform = this._fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', [Validators.minLength(4), Validators.required]],
      password: ['', [Validators.minLength(4), Validators.required]],
      email: ['', Validators.required],
      contact_number: ['', Validators.required],
      role: ['', Validators.required],
    });

    this.registerform = this._fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', [Validators.minLength(4), Validators.required]],
      password: ['', [Validators.minLength(4), Validators.required]],
      email: ['', Validators.required],
      contact_number: ['', Validators.required],
      role: ['', Validators.required],
    });
  }
  showform() {
    if (this.showtable == false) {
      this.showtable = true;
    } else {
      this.showtable = false;
    }
  }
  first_name: any;
  last_name: any;
  username: any;
  password: any;
  email: any;
  contact_number: any;
  role: any;
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  togglePasswordVisibility1() {
    this.hidePasswordc1 = !this.hidePasswordc1;
  }
  togglePasswordVisibility2() {
    this.hidePasswordc2 = !this.hidePasswordc2;
  }
  pass: any;
  pass1: any;
  // confirmPass() {
  //   const msg='password  not same';
  //   if (this.pass !== this.pass1) {
  //     return msg;
  //   }
  // }
  passlogin: any;
  userlogin: any;
  DisableButton: any = false;
  onSubmit() {
    const obj = {
      username: this.userlogin,
      password: this.passlogin,
    };
    console.log(obj);
    this.DisableButton = true;
    // console.log(data);

    this.showtable = false;

    let data = obj;
    this._servicesService.logIn(data).subscribe(
      (res) => {
        alert(res.message);
        this.DisableButton = false;
        if (res.token) {
          // Split the token header, payload, and signature
          const tokenParts = res.token.split('.');
          if (tokenParts.length === 3) {
            // Decode the payload (the second part)
            const payload = JSON.parse(atob(tokenParts[1]));
            if (payload.userRole == 'admin') {
              this._servicesService.IsLoggedIn = true;
              this.router.navigate(['/admin-main']);
            } else {
              alert('other components are not ready');
            }
            sessionStorage.setItem('IsLoggedIn', 'true');
            // Store the decoded payload in local storage
            sessionStorage.setItem('decodedToken', JSON.stringify(payload));
          }
        }
      },
      (error: any) => {
        console.error('Error adding data:', error.error.message);
        alert(error.error.message);
        this.DisableButton = false;
        this._servicesService.IsLoggedIn = false;
      }
    );
  }
  regisetr() {
    const obj = {
      first_name: this.first_name,
      last_name: this.last_name,
      username: this.username,
      password: this.pass,
      email: this.email,
      contact_number: this.contact_number,
      role: this.role,
    };
    console.log(obj);

    let data = obj;
    this._servicesService.register(data).subscribe((res) => {
      alert(res.message);
    });
    (error: any) => {
      console.error('Error adding data:', error);
      alert(error);
    };
  }
  numLen: any = false;
  abc: string = '';
  pas: any = false;
  numberValidation() {
    this.abc = this.contact_number.toString();

    if (this.abc.length == 10) {
      this.numLen = false;
      console.log(this.abc);
    } else {
      this.numLen = true;
    }
  }
  passvalidation() {
    if (this.passlogin.length < 8) {
      this.pas = true;
    } else {
      this.pas = false;
    }
  }
  log: any = false;
  loginValidation() {
    if (this.userlogin.length < 4) {
      this.log = true;
    } else {
      this.log = false;
    }
  }
  em: any = false;

  emailvalidation() {
    const vali = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if (!vali.test(this.email)) {
      this.em = true;
    } else {
      this.em = false;
    }
  }
  pra: any = false;
  pra1: any = false;
  pra2: any = false;
  practi() {
    if (this.first_name.length < 4 ) {
      this.pra = true;
    
    } else {
      this.pra = false;
    }
    if (this.last_name.length < 4 ) {
   
     this.pra1= true;
    
    }else {
      this.pra1 = false;
    }
    if (this.username.length < 4) {
    
      this.pra2 = true;
    }else {
      this.pra2 = false;
    }
  }
}
