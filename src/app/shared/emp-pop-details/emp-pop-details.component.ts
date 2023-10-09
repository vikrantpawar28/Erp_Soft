import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from 'src/app/core/services.service';
@Component({
  selector: 'app-emp-pop-details',
  templateUrl: './emp-pop-details.component.html',
  styleUrls: ['./emp-pop-details.component.css'],
})
export class EmpPopDetailsComponent implements OnInit {
  resetForm: any;
  constructor(
    
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _servicesService: ServicesService,
    
  ) {
    this._servicesService.getEmployees;
    const isoDate = new Date('2023-09-25T00:00:00.000Z');
    // Extract the date part in "yyyy-MM-dd" format
    this.hire_date = isoDate.toISOString().split('T')[0];
  }
  formData: any[] = [];
  ngOnInit() {
    console.log('nhgfjhfyh', this.data);
    this.formData = this.data;
  }
  showTable: any = true;
  contact: any = this.data.data.contact_number;
  email: any = this.data.data.email_id;
  name1: any = this.data.data.employee_firstname;
  hire_date: any = this.data.data.hire_date;
  Department: any = this.data.data.employee_department;
  Status: any = this.data.data.employment_status;

  editDetails() {
    console.log(this.Department);
    if (this.showTable == true) {
      this.showTable = false;
    } else {
      this.showTable = true;
    }
  }
  obj: any;
  saveDetails() {
    // console.log(this.Department)
    this.obj = {
      employee_firstname: this.name1,
      employee_lastname: 'Dhotre',
      employee_department: this.Department,
      contact_number: this.contact,
      email_id: this.email,
      employment_status: this.Status,
      hire_date: this.hire_date
    };
    console.log('this is obj', this.obj);
    this._servicesService.putEmployees(this.obj, this.data.data._id).subscribe(res=>{
      this.fetchData()
      alert(res.message)
      this.showTable=true;
    });
  }
  cancelEdit(){
    this.obj= {};
    this.showTable=true;
  }
  fetchData() {
    this._servicesService.getEmployees().subscribe((data) => {
      // this.employees = data;
      this._servicesService.empData = data; 
      console.log( "Data from popup",data);
    });
  }
  
}
