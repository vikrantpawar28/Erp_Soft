import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServicesService } from 'src/app/core/services.service';
import { AddEmpComponent } from '../add-emp/add-emp.component';
import { EmpPopDetailsComponent } from '../emp-pop-details/emp-pop-details.component';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { ProductPopUpComponent } from '../product-pop-up/product-pop-up.component';
import { AddprojectComponent } from '../addproject/addproject.component';
import { ProjectPopUpComponent } from '../project-pop-up/project-pop-up.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit{
  employees:any[]=this._servicesService.projectData;
  modalService: any;
   
  @Output() fetchDataEvent = new EventEmitter<void>();
  constructor(
    private _dialog: MatDialog,
    public _servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.fetchData();


  }
  str="file:///";
  url:string='C:/Users/Vikrant/Downloads'+'/';
  // isLoading: boolean = true; // Set to true initially

  fetchData() {
    this._servicesService.getProjects().subscribe((data) => {
      this._servicesService.projData=data;
      this._servicesService.projectData=data
      console.log("this is product data",this._servicesService.projectData);
      // this.isLoading = false;
    });
    // this.isLoading = false;
  }
  selectedValue:any="all";
  onSelectChange(event: Event) {
    
   
    console.log('Selected value:', this.selectedValue);
    if (this.selectedValue === 'all') {
      this.employees = this._servicesService.projectData;
    }

    if (this.selectedValue == 'complete') {
      this.employees = this._servicesService.projectData.filter((employee: any) => {
        return employee.project_status == 'complete';
      });
      if (this.employees.length === 0 || this.employees == undefined) {
        this.employees = [];
        this._servicesService.projData=[];
      }
    }

    if (this.selectedValue == 'incomplete') {
      this.employees = this._servicesService.projectData.filter((employee: any) => {
        return employee.project_status == "incomplete";
      });
      if (this.employees.length === 0 || this.employees == undefined) {
        this.employees = [];
        this._servicesService.projData=[];
      }
    }
    if (this.selectedValue == 'pending') {

      this.employees = this._servicesService.projectData.filter((employee: any) => {
        return employee.project_status == "pending";
      });
      if (this.employees.length === 0 || this.employees == undefined) {
        this.employees = [];
        this._servicesService.projData=[];
      }
    }
  
    console.log('changed :    ', this.employees);
  }

  status: boolean = false;
  fetchAsStatus() {
    this._servicesService.getProjects().subscribe((data) => {
      this.employees = data.filter((item: any) => {
        if (item.project_status === "complete") {
          return item;
        } else if (item.project_status === "incomplete") {
          return item;
        } else if(item.project_status === "pending")   {
          return item;
        }
        else{
          return item;
        }
      });
    });
  }

  add_project() {
    this._dialog.open(AddprojectComponent);
  }

  
  openDetails(data: any,i:any) {

    console.log(data,i);
    this._dialog.open(ProjectPopUpComponent, {
      data: {
        data,i
      },
    });
  }

  searchText: string = '';
  searchProjects() {
    if (this.searchText.trim() !== '') {
      this.employees = this._servicesService.projectData.filter((employee: any) => {
        return employee.project_name.toLowerCase().includes(this.searchText.toLowerCase());
      });
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
    this.employees = this._servicesService.projectData.slice(startIndex, endIndex);
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
