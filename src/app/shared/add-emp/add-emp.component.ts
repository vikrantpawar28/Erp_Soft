import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
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
  constructor(
    private _servicesService: ServicesService,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.emp_Form = this._fb.group({
      employee_firstname: ['', [Validators.required]],
      employee_lastname: ['', [Validators.required]],
      employee_department: ['', [Validators.required]],
      contact_number: ['', [Validators.required]],
      email_id:['',[Validators.required,Validators.email]],
      employment_status: [false, [Validators.required]],
      hire_date: ['', [Validators.required,Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
    });
  }

  onSubmit() {
    if (this.emp_Form.valid) {
      console.log(this.emp_Form.value);
      this._servicesService
        .postEmployees(this.emp_Form.value)
        .subscribe((Response) => {
          alert('Data Submitted');
          console.log(Response);
        });
      (error: any) => {
        console.error('Error adding data:', error);
      };
    }
  }
}
