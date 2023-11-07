import { Component, EventEmitter, Output } from '@angular/core';
import { AddLeadComponent } from '../Lead_Mangment/add-lead/add-lead.component';
import { PopUpLeadComponent } from '../Lead_Mangment/pop-up-lead/pop-up-lead.component';
import { MatDialog } from '@angular/material/dialog';
import { ServicesService } from 'src/app/core/services.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-lead-mangment',
  templateUrl: './lead-mangment.component.html',
  styleUrls: ['./lead-mangment.component.css']
})
export class LeadMangmentComponent {
  
  employees:any[]=this._servicesService.projectData;
  modalService: any; 
  activeTab: string = 'leadManagement';
  loading=true;
  showadd=false;
  showView=false;
  projectGroup!: FormGroup;

  tempCategory: any;
   
  @Output() fetchDataEvent = new EventEmitter<void>();
  constructor(
  
    public _servicesService: ServicesService,
    private _dialog: MatDialog,
    public _fb: FormBuilder,
   
  ) {}

  ngOnInit(): void {
    // this.fetchData();
    this._servicesService.getLead().subscribe((data) => {
      this._servicesService.leadData = data;
      this.loading = false;
      console.log('Lead', this._servicesService.leadData);
    });
  }

  

  str="file:///";
  url:string='C:/Users/Vikrant/Downloads'+'/';
  // isLoading: boolean = true; // Set to true initially

  // fetchData() {
  //   this._servicesService.getProjects().subscribe((data) => {
  //     this._servicesService.projData=data;
  //     this._servicesService.projectData=data
  //     console.log("this is product data",this._servicesService.projectData);
  //     // this.isLoading = false;
  //   });
  //   // this.isLoading = false;
  // }
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
  
  add_lead() {
    this.showadd = !this.showadd; // Toggle the value
  }

  
  openDetails() {
this.showadd=false;
    this.showView=!this.showView;
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
  name: any;
  contact: any;
  follow_date: any;
  conversation: any;
  company_name: any;
  company_size: any;
  company_industry: any;
  lead_status: any;
  email: any;
  lead_tag: any;
  lead_description: any;

 
  fetchData() {
    this._servicesService.getProjects().subscribe((data) => {
      this._servicesService.projectData = data;
      console.log('this is product data', this._servicesService.projectData);
    });
  }
  onSubmit(){
    
  }
  closeAddDetails(){
    this.showadd = false;
  }
  cancelEdit() {
    this.showadd = false;
  }

}
