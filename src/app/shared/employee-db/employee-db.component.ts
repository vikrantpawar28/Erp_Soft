import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServicesService } from 'src/app/core/services.service';
import { AddEmpComponent } from '../add-emp/add-emp.component';
import { EmpPopDetailsComponent } from '../emp-pop-details/emp-pop-details.component';

@Component({
  selector: 'app-employee-db',
  templateUrl: './employee-db.component.html',
  styleUrls: ['./employee-db.component.css'],
})
export class EmployeeDbComponent implements OnInit {
  employees: any[] = [];
  modalService: any;

  constructor(
    private _dialog: MatDialog,
    private _servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this._servicesService.getEmployees().subscribe((data) => {
      this.employees = data;
      console.log(data);
    });
  }
  onSelectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected value:', selectedValue);
  }

  status: boolean = false;

  fetchAsStatus() {
    this._servicesService.getEmployees().subscribe((data) => {
      this.employees = data.filter((item: any) => {
        if (item.employment_status === true) {
          return item;
        } else if (item.employment_status === false) {
          return item;
        } else {
          return item;
        }
      });
    });
  }

  add_emp() {
    this._dialog.open(AddEmpComponent);
  }

  //   showTable:any=false;
  //  deails:any[]=[]
  openDetails(data: any) {
    // this.deails.push(data);
    // console.log(this.deails);
    // // this.showTable=true;
    // if(this.showTable==true){
    //   this.showTable=false;
    // }
    // else{
    //   this.showTable=true;
    // }
    this._dialog.open(EmpPopDetailsComponent, {
      data: {
        data
      },
    });
  }
}
