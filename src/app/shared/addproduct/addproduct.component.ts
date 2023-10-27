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
        [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      ],
      category: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      product_name: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      ],
      product_description: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      ],
      brand_name: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      ],
      manufacturer_details: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      ],
      product_price: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      product_dimensions_width: ['', [Validators.required]],
      product_dimensions_length: ['', [Validators.required]],
      product_dimensions_height: ['', [Validators.required]],
      product_weight: ['', [Validators.required]],
      available_stock: ['', [Validators.required]],
      min_required_stock: ['', [Validators.required]],
      tempArr1: ['', [Validators.required]],
      temp2: ['', [Validators.required]],
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

  onSubmit() {
    if (this.selectImageFile) {
      console.log('THIS IS PRODUCT DATA');
      alert('submit btn is clicked');
      const formData = new FormData();
      Object.keys(this.imageGroup.value).forEach((key) => {
        formData.append(key, this.imageGroup.value[key]);
      });
      formData.append('image', this.selectImageFile);
      // formData.append('gif', this.selectGifFile);
      console.log(formData);
      this._servicesService.uploadImages(formData).subscribe((res) => {
        alert(res.message);
        this.fetchData();
      });
      this.dialogRef.close();
      //
    }
  }

  loadImage(event: any) {
    this.selectImageFile = event.target.files[0];
  }

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
