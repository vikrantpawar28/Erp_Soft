import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  MaxLengthValidator,
} from '@angular/forms';
import { ServicesService } from 'src/app/core/services.service';
@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css'],
})
export class AddEmpComponent implements OnInit {
  emp_Form!: FormGroup;
  usersData: [] = [];

  constructor( private _dialog: MatDialog,
    private _servicesService: ServicesService,
    private _fb: FormBuilder,private router:Router
  ) {}

  ngOnInit() {
    this.fetchData();
    this.emp_Form = this._fb.group({
      employee_firstname: ['', [Validators.required]],
      employee_lastname: ['', Validators.required],
      employee_department: ['', [Validators.required]],
      contact_number: ['', [Validators.required]],
      email_id:['',[Validators.required,Validators.email]],
      employment_status: [false, [Validators.required]],
      hire_date: ['', [Validators.required]],
    });
  }

  fetchData() {
    this._servicesService.getEmployees().subscribe((data) => {
     
      this._servicesService.empData=data;
      console.log(data);
    });
   
  }
  onSubmit() { 
    // console.log("data from service on submit",this._servicesService.empData);

    if (this.emp_Form.valid) {
      console.log(this.emp_Form.value);
      this._servicesService
        .postEmployees(this.emp_Form.value)
        .subscribe((Response) => {
          alert('Data Submitted');
          this.fetchData();
          console.log(Response);
          this._dialog.closeAll();
         
        });
      (error: any) => {
        console.error('Error adding data:', error);
        alert(error)
      };
    }
  }
  isDropdownOpen = false;
  selectedValue: string = 'Select an option';

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(value: string) {
    this.selectedValue = value;
    this.isDropdownOpen = false;
  }

}

 
