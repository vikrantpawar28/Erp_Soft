import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServicesService } from 'src/app/core/services.service';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { ProductPopUpComponent } from '../product-pop-up/product-pop-up.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent {

  employees:any[]=this._servicesService.prodData;
  modalService: any;
  loading = true;
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
    this._servicesService.getProducts().subscribe((data) => {
      this._servicesService.prodData=data
      this.loading=false;
      console.log("this is product data",this._servicesService.prodData);
      // this.isLoading = false;
    });
    // this.isLoading = false;
  }
  onSelectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected value:', selectedValue);
    if (selectedValue === 'all') {
      this.employees = [];
    }

    if (selectedValue === 'active') {
      this.employees = this.employees.filter((employee: any) => {
        return employee.Availablity == 'active';
      });
    }

    if (selectedValue === 'inactive') {
      this.employees = this.employees.filter((employee: any) => {
        return employee.Availablity == "inactive";
      });
    }
    if (selectedValue === 'out_Of_Stock') {
      this.employees = this.employees.filter((employee: any) => {
        return employee.Availablity == "out_Of_Stock";
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

  add_product() {
    this._dialog.open(AddproductComponent);
  }

  
  openDetails(data: any,i:any) {

    console.log(data,i);
    this._dialog.open(ProductPopUpComponent, {
      data: {
        data,i
      },
    });
  }

  searchText: string = '';
  searchEmployees() {
    if (this.searchText.trim() !== '') {
      this.employees = this._servicesService.prodData.filter((employee: any) => {
        return employee.product_name.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.employees = this._servicesService.prodData;
    }
  }

  currentPage: number = 0;
  itemsPerPage: number = 9;
  updateEmployees() {
    // Calculate the start and end indices based on the currentPage and itemsPerPage
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    // Slice the data to get the current page's elements
    this.employees = this._servicesService.prodData.slice(startIndex, endIndex);
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
      this._servicesService.prodData.length / this.itemsPerPage
    );
    if (this.currentPage < totalPages - 1) {
      this.currentPage++;
      this.updateEmployees();
    }
  }


  

}



