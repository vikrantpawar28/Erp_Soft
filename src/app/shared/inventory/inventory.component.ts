import { Component, EventEmitter, Output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ServicesService } from 'src/app/core/services.service';
import { AddEmpComponent } from '../add-emp/add-emp.component';
import { EmpPopDetailsComponent } from '../emp-pop-details/emp-pop-details.component';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { ProductPopUpComponent } from '../product-pop-up/product-pop-up.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent {
  // employees: any[] = [
  //   {
  //     pName: 'kurta',
  //     pCategory: 'clothing',
  //     psub_Category: 'Mens',
  //     pImage: [
  //       { imageURL: 'https://shorturl.at/yIJZ1', imageName: 'pink Kurta' },
  //       { imageURL: 'https://shorturl.at/eqBFT', imageName: 'black Kurta' },
  //     ],
  //     Description: 'lorem ipsum fujfiuyetgiuweg8ifuwe few',
  //     Brand: 'lucknowi',
  //     Price: '450',
  //     Dimensions: '35',
  //     weight: '500gm',
  //     Availablity: 'inStock',
  //     SupplierInfo: 'jhfsafghj',
  //   },
  //   {
  //     pName: 'shirts',
  //     pCategory: 'clothing',
  //     psub_Category: 'Mens',
  //     pImage: [
  //       { imageURL: 'https://shorturl.at/DEOW9', imageName: 'checks shirt' },
  //       { imageURL: 'https://shorturl.at/tINV6', imageName: 'black shirt' },
  //     ],
  //     Description: 'lorem ipsum fujfiuyetgiuweg8ifuwe few',
  //     Brand: 'Raymond',
  //     Price: '1000',
  //     Dimensions: '35',
  //     weight: '500gm',
  //     Availablity: 'out_Of_Stock',
  //     SupplierInfo: 'jhfsafghj',
  //   },
  // ];
  employees:any[]=this._servicesService.prodData;
  modalService: any;
  @Output() fetchDataEvent = new EventEmitter<void>();
  constructor(
    private _dialog: MatDialog,
    public _servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.fetchData();
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
    if (selectedValue === 'all') {
      this.employees = [];
    }

    if (selectedValue === 'active') {
      this.employees = this.employees.filter((employee: any) => {
        return employee.Availablity == true;
      });
    }

    if (selectedValue === 'inactive') {
      this.employees = this.employees.filter((employee: any) => {
        return employee.Availablity == false;
      });
    }
    if (selectedValue === 'out_Of_Stock') {
      this.employees = this.employees.filter((employee: any) => {
        return employee.Availablity == false;
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

  //   showTable:any=false;
  //  deails:any[]=[]
  openDetails(data: any,i:any) {
    // this.deails.push(data);
    // console.log(this.deails);
    // // this.showTable=true;
    // if(this.showTable==true){
    //   this.showTable=false;
    // }
    // else{
    //   this.showTable=true;
    // }
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
      this.employees = this.employees.filter((employee: any) => {
        return employee.pName
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
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
    const totalPages = Math.ceil(
      this._servicesService.empData.length / this.itemsPerPage
    );
    if (this.currentPage < totalPages - 1) {
      this.currentPage++;
      this.updateEmployees();
    }
  }
}
