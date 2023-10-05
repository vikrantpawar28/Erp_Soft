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
  pName: any;
  pdescription: any;
  pCategory: any;
  sub_Category: any;
  pBrand: any;
  pImage: any = [];
  pPrice: any;
  pDimensions: any;
  pWeight: any;
  pSupllierInfo: any;
  pReturnPolicy: any;
  pAvailablity: any;

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
    this.pName = ' ';
    this.pdescription = ' ';
    this.pCategory = ' ';
    this.sub_Category = ' ';
    this.pImage = ' ';
    this.pWeight = ' ';
    this.pPrice = ' ';
    this.pBrand = ' ';
    this.pAvailablity = '';
    this.pDimensions = '';
  }

  obj: any;
  saveDetails() {
    this.obj = {
      pName: this.pName,
      Description: this.pdescription,
      pCategory: this.pCategory,
      psub_Category: this.sub_Category,
      pImage: this.pImage,
      weight: this.pWeight,
      Price: this.pPrice,
      Brand: this.pBrand,
      Availanlity: this.pAvailablity,
      Dimensions: this.pDimensions,
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
