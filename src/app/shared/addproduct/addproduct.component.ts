import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ServicesService } from 'src/app/core/services.service';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';

import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit {
  tempArr1: any[] = [];
  temp2: any[] = [];
  temp3: any;

  show(data: any) {
    console.log(data);

    for (let i = 0; i < this.categorydata.length; i++) {
      if (data == this.categorydata[i].product_category) {
        this.temp2 = this.categorydata[i].subcategories;
        // console.log(this.temp2);
      }
    }
  }
  showdata(data: any) {
    console.log(data);
  }
  imageGroup!: FormGroup;
  categoryGroup!: FormGroup;

  selectImageFile: File | null = null;
  selectGifFile: File | null = null;
  tempCategory: any;

  categorydata: any[] = [];

  showCategoryForm: boolean = false;

  onShowCategoryForm() {
    this.showCategoryForm = true;
  }

  constructor(
    public _servicesService: ServicesService,
    public _fb: FormBuilder,
    private dialogRef: MatDialogRef<AddproductComponent>
  ) {}

  ngOnInit() {
    this._servicesService.getCategory().subscribe((data) => {
      this.categorydata = data;
      console.log(this.categorydata);
    });

    this.categoryGroup = this._fb.group({
      product_category: ['', [Validators.required]],
      product_subcategory: ['', [Validators.required]],
    });

    this.imageGroup = this._fb.group({
      subcategory: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z0-9]{24}$/)],
      ],
      // category: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      product_name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]+$/),
          Validators.minLength(4),
        ],
      ],
      product_description: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9\s]+$/),
          Validators.minLength(20),
        ],
      ],
      brand_name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]+$/),
          Validators.minLength(3),
        ],
      ],
      manufacturer_details: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9\s]+$/),
          Validators.minLength(20),
        ],
      ],
      product_price: ['', [Validators.required, Validators.pattern(/^[\d]$/)]],
      currency: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}$/)]],
      product_dimensions_width: [
        '',
        [Validators.required, Validators.pattern(/^[\d]$/)],
      ],
      product_dimensions_length: [
        '',
        [Validators.required, Validators.pattern(/^[\d]$/)],
      ],
      product_dimensions_height: [
        '',
        [Validators.required, Validators.pattern(/^[\d]$/)],
      ],
      product_weight: ['', [Validators.required, Validators.pattern(/^[\d]$/)]],
      available_stock: [
        '',
        [Validators.required, Validators.pattern(/^[\d]$/)],
      ],
      min_required_stock: [
        '',
        [Validators.required, Validators.pattern(/^[\d]$/)],
      ],
      // tempArr1: ['', [Validators.required]],
      // temp2: ['', [Validators.required]],
    });
  }
  fetchData() {
    this._servicesService.getProducts().subscribe((data) => {
      this._servicesService.prodData = data;
      console.log('this is product data', this._servicesService.prodData);
    });
  }

  onsubmitCat() {
    if (this.categoryGroup.valid) {
      this._servicesService
        .addCategory(this.categoryGroup.value)
        .subscribe((res) => {
          alert(res.message);
          this.showCategoryForm = false;
        });
    }
  }
  abc(subcategory: any) {
    console.log(subcategory);
  }
  loading = false;
  onSubmit() {
    this.loading = true;
    console.log(this.imageGroup.value);
    if (this.imageGroup.valid) {
      console.log('THIS IS PRODUCT DATA');

      // const formData = new FormData();
      // Object.keys(this.imageGroup.value).forEach((key) => {
      //   formData.append(key, this.imageGroup.value[key]);

      // });
      // formData.append('image', this.selectImageFile);
      // formData.append('gif', this.selectGifFile);
      console.log(this.imageGroup.value);
      this._servicesService
        .uploadImages(this.imageGroup.value)
        .subscribe((res) => {
          alert(res.message);
          this.loading = false;
          this.fetchData();
        });
      this.dialogRef.close();
      //
    }
  }

  // loadImage(event: any) {
  //   this.selectImageFile = event.target.files[0];
  // }

  loadGif(event: any) {
    this.selectGifFile = event.target.files[0];
  }

  // getErrorMessage() {
  //   if (this.imageGroup.product_name.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //   return this.imageGroup.product_name.hasError('email') ? 'Not a valid email' : ''
  // }
}
