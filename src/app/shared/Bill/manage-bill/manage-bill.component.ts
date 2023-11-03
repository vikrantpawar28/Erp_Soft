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
  loading=true;
  showView=false;
  showOptions: boolean = false;

  @Output() fetchDataEvent = new EventEmitter<void>();
  dialogRef: any;
  constructor(
    private _dialog: MatDialog,
    public _servicesService: ServicesService,
    private router: Router,
    
  ) { this._servicesService.prodData;}

  ngOnInit(): void {
    this.fetchData();
  }
  onSelectChange1(event:Event,employee:any) {
    this._servicesService.singleBillData[0]=employee;
    console.log("service data",this._servicesService.singleBillData)
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'viewBill') {
      this.showView = true;
    } else {
      this.showView = false;
    }
  }
  closeViewDetails() {
    this.showView = false;
  }
  printBill(){
    window.print();
    
  }
  

  addbill() {
    this.router.navigate(['/admin-main/addbill']);
  }
  fetchData() {
    this._servicesService.getBill().subscribe((data) => {
      this._servicesService.billData = data;
      this.loading=false;
      console.log('Bill', this._servicesService.billData);
    });
    this._servicesService.getProducts().subscribe((data) => {
      this._servicesService.prodData = data;
      console.log('this is product data', this._servicesService.prodData);
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

  // viewbill_popup(selectedValue: any, data: any) {
  //   this._servicesService.singleBillData[0]=data;
  //   console.log(' from service', this._servicesService.singleBillData);
  //   if (selectedValue === 'viewBill') {
  //     this._dialog.open(ViewbillPopupComponent, {
  //       data: selectedValue, // Pass the selectedValue as data
  //     });
  //   }
  //   if (selectedValue === 'editBill') {
  //     this._dialog.open(EditbillPopupComponent, {
  //       data: selectedValue, // Pass the selectedValue as data
  //     });
  //   }
  //   if (selectedValue === 'deleteBill') {
  //     // this._servicesService.projectData.splice(this.data.i, 1);
  //     // alert('deleted');
  //     // // this.reset();
  //     // this.dialogRef.close();
  //   }
  // }

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
  selectedFormat = 'csv';
  downloadLink: string | undefined;
  downloadFileName: string | undefined;

  convertData() {
    // Assuming you have your JSON data in this variable
    const jsonData = this._servicesService.billData;

    if (this.selectedFormat === 'csv') {
      // const csvData = this._servicesService.jsonToCsv(jsonData);
      // this.downloadLink = this.createDownloadLink(csvData, 'data.csv');
    } else if (this.selectedFormat === 'excel') {
      const excelBlob = this._servicesService.jsonToExcel(jsonData, 'Sheet1');
      this.downloadLink = this.createDownloadLink(excelBlob, 'data.xlsx');
    }
  }

  createDownloadLink(data: Blob | string, fileName: string) {
    const blob = typeof data === 'string' ? new Blob([data], { type: 'text/csv' }) : data;
    const url = window.URL.createObjectURL(blob);
    this.downloadFileName = fileName;
    return url;
  }

  sendViaEmail(){
    this.showOptions=false;
  }
  sendViaWhatsApp(){
    this.showOptions=false;
  }

  
}
