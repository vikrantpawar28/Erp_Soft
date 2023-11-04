import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import {
  FormGroup,
  FormBuilder,
  Validators
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
  submitted = false;

  constructor(
    private _dialog: MatDialog,
    private _servicesService: ServicesService,
    private _fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchData();
    this.emp_Form = this._fb.group({
      employee_firstname: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z]+$/),
          Validators.minLength(4),
        ],
      ],
      employee_lastname: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z]+$/),
          Validators.minLength(4),
        ],
      ],
      employee_department: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z]+$/),
          Validators.minLength(2),
        ],
      ],
      contact_number: [
        '',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      email_id: ['', [Validators.required, Validators.email]],
      employment_status: [, [Validators.required]],
      hire_date: ['', [Validators.required]],
    });
  }

  // isDataValid(field: string): boolean {
  //   // const validFormat = /^[A-Za-z]+$/;
  //   // return validFormat.test(this.emp_Form.value.employee_firstname);
  //   return
  // }
  fetchData() {
    this._servicesService.getEmployees().subscribe((data) => {
      this._servicesService.empData = data;
      console.log(data);
    });
  }
  loading = false;
  onSubmit() {
    // console.log("data from service on submit",this._servicesService.empData);
    this.submitted = true;
    this.loading = true;
    if (this.emp_Form.valid) {
      console.log(this.emp_Form.value);
      this._servicesService
        .postEmployees(this.emp_Form.value)
        .subscribe((Response) => {
          // alert('Data Submitted');
          console.log("ERR",Response.error)
          this.fetchData();
          this.loading = false;
          // console.log("data submitted",Response);
          this._dialog.closeAll();
        });
      (error: any) => {
        console.error('Error adding data:', error);
        alert(error);
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
