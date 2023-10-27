import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from 'src/app/core/services.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-emp-pop-details',
  templateUrl: './emp-pop-details.component.html',
  styleUrls: ['./emp-pop-details.component.css'],
})
export class EmpPopDetailsComponent implements OnInit {
  resetForm: any;
  constructor(
    private dialogRef: MatDialogRef<EmpPopDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _servicesService: ServicesService
  ) {
    this._servicesService.getEmployees;
    // const isoDate = new Date('2023-09-25T00:00:00.000Z');
    // // Extract the date part in "yyyy-MM-dd" format
    // this.hire_date = isoDate.toISOString().split('T')[0];
  }
  formData: any[] = [];
  ngOnInit() {
    console.log('nhgfjhfyh', this.data);
    this.formData = this.data;
  }
  showTable: any = true;
  contact: any = this.data.data.contact_number;
  email: any = this.data.data.email_id;
  first_name: any = this.data.data.employee_firstname;
  last_name: any = this.data.data.employee_lastname;
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
      employee_firstname: this.first_name,
      employee_lastname: this.last_name,
      employee_department: this.Department,
      contact_number: this.contact,
      email_id: this.email,
      employment_status: this.Status,
      hire_date: this.hire_date,
    };
    console.log('this is obj', this.obj);
    this._servicesService
      .putEmployees(this.obj, this.data.data._id)
      .subscribe((res) => {
        this.fetchData();
        alert(res.message);
        this.dialogRef.close();
        this.showTable = true;
      });
  }
  cancelEdit() {
    this.obj = {};
    this.showTable = true;
  }
  fetchData() {
    this._servicesService.getEmployees().subscribe((data) => {
      // this.employees = data;
      this._servicesService.empData = data;
      console.log('Data from popup', data);
    });
  }
  DeleteDetails() {
    this._servicesService.empData.splice(this.data.i, 1);
    alert('deleted');

    this.dialogRef.close();
  }
}
