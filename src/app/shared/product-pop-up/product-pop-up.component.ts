import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from 'src/app/core/services.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-pop-up',
  templateUrl: './product-pop-up.component.html',
  styleUrls: ['./product-pop-up.component.css'],
})
export class ProductPopUpComponent implements OnInit {
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
    this.getCategory();
  }
  subcategory: string = '';

  showTable: any = true;
  product_name: any;
  product_description: any;
  product_category: any;
  product_subcategory: any;
  brand: any;
  pImage: any = [];
  product_price: any;
  product_dimensions_length: any;
  product_dimensions_weight: any;
  product_weight: any;
  manufacturer_details: any;
  pReturnPolicy: any;
  pAvailablity: any;
  available_stock: any;
  min_required_stock: any;
  currency: any;
  product_dimensions_width: any;
  product_dimensions_height: any;
  selectImageFile: File | null = null;
  selectGifFile: File | null = null;

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
    this.product_category = ' ';
    this.product_subcategory = ' ';
    this.pImage = ' ';
    this.product_weight = ' ';
    this.product_price = ' ';
    this.brand = ' ';
    this.pAvailablity = '';
    this.product_dimensions_length = '';
    this.available_stock = '';
    this.min_required_stock = '';
    this.manufacturer_details = '';
    this.currency = '';
    this.product_weight = '';
    this.product_dimensions_height = '';
  }
  pGif: any;
  obj: any;
  saveDetails() {
    console.log(this.data.data.id);
    if (this.selectImageFile && this.selectGifFile) {
      this.obj = {
        product_name: this.product_name,
        product_description: this.product_description,
        // product_category: this.product_category,
        subcategory: this.subcategory,
        // product_image: this.selectImageFile,
        // product_multimedia:this.selectGifFile,
        product_weight: this.product_weight,
        product_price: this.product_price,
        currency: this.currency,
        product_dimensions_width: this.product_dimensions_width,
        product_dimensions_height: this.product_dimensions_height,
        product_dimensions_length: this.product_dimensions_length,
        available_stock: this.available_stock,
        min_required_stock: this.min_required_stock,
        brand: this.brand,
        manufacturer_details: this.manufacturer_details,
      };
      this._servicesService
        .updateProducts(this.obj, this.data.data.id)
        .subscribe((res) => {
          alert(res.message);
          this.showTable = true;
        });

      const formData = new FormData();
      Object.keys(this.obj).forEach((key) => {
        formData.append(key, this.obj[key]);
      });

      formData.append('image', this.selectImageFile);
      formData.append('gif', this.selectGifFile);
// console.log(this.selectImageFile,this.selectGifFile)
this._servicesService.uploadImages(formData).subscribe(res => {
  alert(res.message);
})
      console.log('this is formdata', formData);
    }

    console.log(this.obj);
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
      this.pImage = filename;
      console.log(this._servicesService.url + filename);
    }
  }
  cancelEdit() {
    this.obj = {};
    this.showTable = true;
  }
  fetchData() {
    this._servicesService.categoryData;
  }

  loadImage(event: any) {
    this.selectImageFile = event.target.files[0];
  }

  loadGif(event: any) {
    this.selectGifFile = event.target.files[0];
  }
  getCategory() {
    this._servicesService.getCategory().subscribe((res) => {
      this._servicesService.categoryData = res;
      console.log(this._servicesService.categoryData);
    });
  }
}
