import {
  Component,
  OnInit,
  TemplateRef,
  EventEmitter,
  Output,
} from '@angular/core';
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
  @Output() fetchDataEvent = new EventEmitter<void>();
  constructor(
    private _dialog: MatDialog,
    public _servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.fetchData();
    // console.timeLog(this._servicesService.empBack=this._servicesService.empData.slice(0,9));
  }

  fetchData() {
    this._servicesService.getEmployees().subscribe((data) => {
      // this.employees = data;
      this._servicesService.empData = data;
     

      // this.employees = this._servicesService.empData;
      console.log(data);
    });
  }
  onSelectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected value:', selectedValue);
    if(selectedValue==="all"){
      this.employees=[];
    }

    if (selectedValue === 'true') {
      this.employees = this._servicesService.empData.filter((employee: any) => {
        return employee.employment_status == true;
      });
    }

    if (selectedValue === 'false') {
      this.employees = this._servicesService.empData.filter((employee: any) => {
        return employee.employment_status == false;
      });
    }
    console.log('changed :    ', this.employees);
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
    console.log(data)
    this._dialog.open(EmpPopDetailsComponent, {
      data: {
        data,
      },
    });
  }

  searchText: string = '';
  searchEmployees() {
    if (this.searchText.trim() !== '') {
      this.employees = this._servicesService.empData.filter((employee: any) => {
        return employee.employee_firstname.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.employees = this._servicesService.empData;
    }
  }

  currentPage: number = 0; 
  itemsPerPage: number = 9;

  updateEmployees() {
    // Calculate the start and end indices based on the currentPage and itemsPerPage
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    // Slice the data to get the current page's elements
    this.employees = this._servicesService.empData.slice(startIndex, endIndex);
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
    const totalPages = Math.ceil(this._servicesService.empData.length / this.itemsPerPage);
    if (this.currentPage < totalPages - 1) {
      this.currentPage++;
      this.updateEmployees();
    }
  }
}
