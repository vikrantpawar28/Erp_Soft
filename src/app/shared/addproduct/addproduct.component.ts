import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ServicesService } from 'src/app/core/services.service';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent {
  product_Form!: FormGroup;
  usersData: [] = [];
  selectedValue: any = '';
  pName: any = '';
  pdescription: any = '';
  pCategory: any = '';
  sub_Category: any = '';
  pBrand: any = '';
  pImage: any = ([] = '');
  pPrice: any = '';
  pDimensions: any = '';
  pWeight: any = '';
  pSupllierInfo: any = '';
  pReturnPolicy: any = '';

  productDetail: any[] = [];

  constructor(
    private _dialog: MatDialog,
    private _servicesService: ServicesService,
    private _fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<AddproductComponent>
  ) {}

  ngOnInit() {
    this.product_Form = this._fb.group({
      employee_firstname: ['', [Validators.required]],
      employee_lastname: ['', [Validators.required]],
      employee_department: ['', [Validators.required]],
      contact_number: ['', [Validators.required]],
      email_id: ['', [Validators.required, Validators.email]],
      employment_status: ['', [Validators.required]],
      hire_date: [
        '',
        [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
      ],
    });
  }
  submitData() {
    alert(' New Product Added');
    const prodData = {
      pName: this.pName,
      Description: this.pdescription,
      pCategory: this.pCategory,
      psub_Category: this.sub_Category,
      pImage: this.pImage,
      Brand: this.pBrand,
      Price: this.pPrice,
      Dimensions: this.pDimensions,
      weight: this.pWeight,
      Availablity: this.selectedValue,
    };
  
    this.productDetail.push(prodData);
    console.log(prodData);
    this._servicesService.prodData.push(prodData);
    this.dialogRef.close();
  }

  isSubmitDisabledt() {
    return (!this.pName.trim() || !this.pdescription.trim()
     || !this.pCategory.trim()|| !this.sub_Category.trim()
     ||! this.pImage.trim() || !this.pBrand.trim()
     || !this.pPrice.trim() || !this.pDimensions.trim()
     || !this.pWeight.trim() || !this.selectedValue.trim()
     )
    
  }

  fetchData() {
    this._servicesService.getEmployees().subscribe((data) => {
      this._servicesService.empData = data;
      console.log(data);
    });
  }
}
