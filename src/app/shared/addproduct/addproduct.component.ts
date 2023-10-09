import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ServicesService } from 'src/app/core/services.service';

import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent {
  product_Form!: FormGroup;
  usersData: [] = [];
  selectedValue: any = '';
  product_name: any = '';
  product_description: any = '';
  pCategory: any = '';
  subcategory: any = '';
  brand_name: any = '';
  pImage:any='';
  product_price: any = '';
  product_dimensions_length: any = '';
  product_dimensions_width: any = '';
  manufacturer_details: any = '';
  product_dimensions_height: any = '';
  product_weight:any="";
  available_stock:any='';
  min_required_stock:any=''
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
      pName: this.product_name,
      Description: this.  product_description,
      pCategory: this.pCategory,
      psub_Category: this.subcategory,
      pImage: this.pImage,
      Brand: this.  brand_name,
      Price: this.product_price,
      Length: this. product_dimensions_length,
      width: this.product_dimensions_width,
      Availablity: this.selectedValue,
      manufacturer_details:this. manufacturer_details,
      Weight:this.product_weight,
      min_required_stock:this.min_required_stock,
      available_stock:this.available_stock
    };
    this.productDetail.push(prodData);
    console.log(prodData);
    this._servicesService.prodData.push(prodData);
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Get the full path from the input element
      const fullPath = event.target.value;
      // Split the path by backslashes to extract the filename
      const parts = fullPath.split('\\');
      const filename = parts[parts.length - 1];
      // Store the filename in your variable
      this.pImage=filename;
      console.log(this._servicesService.url+filename)
    }
  }

  isSubmitDisabledt() {
    return (!this.product_name.trim() || !this.  product_description.trim()
     || !this.pCategory.trim()|| !this.subcategory.trim()
      || !this.  brand_name.trim()|| !this.product_weight.trim()
     || !this.product_price.trim() || !this. product_dimensions_length.trim()
     || !this.product_dimensions_width.trim() || !this.selectedValue.trim()
     || !this.min_required_stock.trim() || !this.available_stock.trim()
     )
  }

  fetchData() {
    this._servicesService.getEmployees().subscribe((data) => {
      this._servicesService.empData = data;
      console.log(data);
    });
  }
}
