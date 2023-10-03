import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


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

  constructor( private _dialog: MatDialog,
    private _servicesService: ServicesService,
    private _fb: FormBuilder,private router:Router
  ) {}

  ngOnInit() {
    this.emp_Form = this._fb.group({
      employee_firstname: ['', [Validators.required]],
      employee_lastname: ['', [Validators.required]],
      employee_department: ['', [Validators.required]],
      contact_number: ['', [Validators.required]],
      email_id:['',[Validators.required,Validators.email]],
      employment_status: ['', [Validators.required]],
      hire_date: ['', [Validators.required,Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
    });
  }
  handleFetchData() {
    // Handle the fetched data here
    console.log('Data fetched in ComponentB');
  }
  fetchData() {
    this._servicesService.getEmployees().subscribe((data) => {
     
      this._servicesService.empData=data;
      console.log(data);
    });
   
  }
  onSubmit() {

    
    console.log("data from service on submit",this._servicesService.empData);
    if (this.emp_Form.valid) {
      console.log(this.emp_Form.value);
      this._servicesService
        .postEmployees(this.emp_Form.value)
        .subscribe((Response) => {
          
          alert('Data Submitted');
          console.log(Response);
     
          this._dialog.closeAll();
          this.fetchData();
          
        
        });
      (error: any) => {
        console.error('Error adding data:', error);
        alert(error)
      };
    }
  }

}

 
