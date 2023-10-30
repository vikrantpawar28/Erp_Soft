import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServicesService } from 'src/app/core/services.service';
import { ViewbillPopupComponent } from '../viewbill-popup/viewbill-popup.component';
import { EditbillPopupComponent } from '../editbill-popup/editbill-popup.component';
import { AddBillComponent } from '../add-bill/add-bill.component';
import { Router } from '@angular/router';
// import { AddEmpComponent } from '../add-emp/add-emp.component';
// import { EmpPopDetailsComponent } from '../emp-pop-details/emp-pop-details.component';
// import { AddproductComponent } from '../addproduct/addproduct.component';
// import { ProductPopUpComponent } from '../product-pop-up/product-pop-up.component';
// import { AddprojectComponent } from '../addproject/addproject.component';
// import { ProjectPopUpComponent } from '../project-pop-up/project-pop-up.component';

@Component({
  selector: 'app-manage-bill',
  templateUrl: './manage-bill.component.html',
  styleUrls: ['./manage-bill.component.css'],
})
export class ManageBillComponent {
  employees: any[] = this._servicesService.projectData;
  modalService: any;

  @Output() fetchDataEvent = new EventEmitter<void>();
  dialogRef: any;
  constructor(
    private _dialog: MatDialog,
    public _servicesService: ServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  addbill() {
    this.router.navigate(['/admin-main/addbill']);
  }
  fetchData() {
    this._servicesService.getBill().subscribe((data) => {
      this._servicesService.billData = data;
      console.log('Bill', this._servicesService.billData);
    });
  }
  selectedValue: any = 'all';

  onSelectChange(event: Event) {
    console.log('Selected value:', this.selectedValue);
    if (this.selectedValue === 'all') {
      this.employees = this._servicesService.projectData;
    }

    if (this.selectedValue == 'complete') {
      this.employees = this._servicesService.projectData.filter(
        (employee: any) => {
          return employee.project_status == 'complete';
        }
      );
      if (this.employees.length === 0 || this.employees == undefined) {
        this.employees = [];
        this._servicesService.projData = [];
      }
    }

    if (this.selectedValue == 'incomplete') {
      this.employees = this._servicesService.projectData.filter(
        (employee: any) => {
          return employee.project_status == 'incomplete';
        }
      );
      if (this.employees.length === 0 || this.employees == undefined) {
        this.employees = [];
        this._servicesService.projData = [];
      }
    }
    if (this.selectedValue == 'pending') {
      this.employees = this._servicesService.projectData.filter(
        (employee: any) => {
          return employee.project_status == 'pending';
        }
      );
      if (this.employees.length === 0 || this.employees == undefined) {
        this.employees = [];
        this._servicesService.projData = [];
      }
    }

    console.log('changed :    ', this.employees);
  }

  viewbill_popup(selectedValue: any, data: any) {
    this._servicesService.singleBillData[0]=data;
    console.log(' from service', this._servicesService.singleBillData);
    if (selectedValue === 'viewBill') {
      this._dialog.open(ViewbillPopupComponent, {
        data: selectedValue, // Pass the selectedValue as data
      });
    }
    if (selectedValue === 'editBill') {
      this._dialog.open(EditbillPopupComponent, {
        data: selectedValue, // Pass the selectedValue as data
      });
    }
    if (selectedValue === 'deleteBill') {
      // this._servicesService.projectData.splice(this.data.i, 1);
      // alert('deleted');
      // // this.reset();
      // this.dialogRef.close();
    }
  }

  status: boolean = false;
  fetchAsStatus() {
    this._servicesService.getProjects().subscribe((data) => {
      this.employees = data.filter((item: any) => {
        if (item.project_status === 'complete') {
          return item;
        } else if (item.project_status === 'incomplete') {
          return item;
        } else if (item.project_status === 'pending') {
          return item;
        } else {
          return item;
        }
      });
    });
  }

  // add_project() {
  //   this._dialog.open(AddprojectComponent);
  // }

  openDetails(data: any, i: any) {
    console.log(data, i);
    // this._dialog.open(ProjectPopUpComponent, {
    //   data: {
    //     data,i
    //   },
    // });
  }

  searchText: string = '';
  searchProjects() {
    if (this.searchText.trim() !== '') {
      this.employees = this._servicesService.projectData.filter(
        (employee: any) => {
          return employee.project_name
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
        }
      );
    } else {
      this.employees = this._servicesService.projectData;
    }
  }

  currentPage: number = 0;
  itemsPerPage: number = 9;
  updateEmployees() {
    // Calculate the start and end indices based on the currentPage and itemsPerPage
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    // Slice the data to get the current page's elements
    this.employees = this._servicesService.projectData.slice(
      startIndex,
      endIndex
    );
  }

  previous() {
    // Decrement the currentPage if it's within the valid range and update the employees
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateEmployees();
    }
  }

  next() {
    // Increment the currentPage if it's within the valid range and update the employees
    const totalPages = Math.ceil(
      this._servicesService.projectData.length / this.itemsPerPage
    );
    if (this.currentPage < totalPages - 1) {
      this.currentPage++;
      this.updateEmployees();
    }
  }
}
