import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from 'src/app/core/services.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-pop-up',
  templateUrl: './product-pop-up.component.html',
  styleUrls: ['./product-pop-up.component.css'],
})
export class ProductPopUpComponent {
  resetForm: any;
  constructor(
    private dialogRef: MatDialogRef<ProductPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _servicesService: ServicesService
  ) {
    this._servicesService.prodData;
  }
  formData: any[] = [];
  ngOnInit() {
    console.log('nhgfjhfyh', this._servicesService.prodData);
    this.data;
  }
  showTable: any = true;
  product_name: any;
  product_description: any;
  pCategory: any;
  subcategory: any;
  brand_name: any;
  pImage: any = [];
  product_price: any;
  product_dimensions_length: any;
  product_weight: any;
  manufacturer_details: any;
  pReturnPolicy: any;
  pAvailablity: any;
  available_stock:any;
  min_required_stock:any;

  editDetails() {
    if (this.showTable == true) {
      this.showTable = false;
    } else {
      this.showTable = true;
    }
  }
  productDetail: any[] = [];
  deleteDetails() {
    this._servicesService.prodData.splice(this.data.i, 1);
    alert('deleted');
    this.reset();
    this.dialogRef.close();
  }

  reset() {
    this.product_name = ' ';
    this.product_description = ' ';
    this.pCategory = ' ';
    this. subcategory = ' ';
    this.pImage = ' ';
    this.product_weight = ' ';
    this.product_price = ' ';
    this.brand_name = ' ';
    this.pAvailablity = '';
    this.product_dimensions_length = '';
    this.available_stock='';
    this.min_required_stock=''
    this.manufacturer_details='';
  }

  obj: any;
  saveDetails() {
    this.obj = {
      pName: this.product_name,
      Description: this.product_description,
      pCategory: this.pCategory,
      psub_Category: this.  subcategory,
      pImage: this.pImage,
      weight: this.product_weight,
      Price: this.product_price,
      Brand: this.brand_name,
      Availanlity: this.pAvailablity,
      Dimensions: this.product_dimensions_length,
      available_stock:this.available_stock,
      min_required_stock:this.min_required_stock,
      manufacturer_details:this.manufacturer_details
    };
    this._servicesService.prodData[this.data.i]=this.obj;
  }







  cancelEdit() {
    this.obj = {};
    this.showTable = true;
  }
  fetchData() {
    this._servicesService.prodData;
  }
}
