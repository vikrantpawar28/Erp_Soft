import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ServicesService } from 'src/app/core/services.service';
import { HttpClient } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field'
import {NgIf} from '@angular/common';

import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,ReactiveFormsModule
} from '@angular/forms';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit {
//   public imageGroup!: FormGroup;
//   categoryForm!: FormGroup;
//   product_Form!: FormGroup;
//   usersData: [] = [];
//    selectedValue: string = '';
// product_name: string = '';
// product_description: string = '';
// pCategory: string = '';
// subcategory: string = '';
// brand_name: string = '';
// pImage: string = ''; // Assuming it's a URL or base64 string
// product_price: number | null = null; // Assuming it's a number, use null if it's initially empty
// product_dimensions_length: number | null = null; // Assuming it's a number, use null if it's initially empty
// product_dimensions_width: number | null = null; // Assuming it's a number, use null if it's initially empty
// manufacturer_details: string = '';
// product_dimensions_height: number | null = null; // Assuming it's a number, use null if it's initially empty
// product_weight: number | null = null; // Assuming it's a number, use null if it's initially empty
// available_stock: number | null = null; // Assuming it's a number, use null if it's initially empty
// min_required_stock: number | null = null; // Assuming it's a number, use null if it's initially empty
// productDetail: any[] = [];
// product_category: string = ''; // Assuming it's a string
// product_subcategory: string = ''; // Assuming it's a string
// currency: string = ''; // Assuming it's a string
// selectImageFile: File | null = null;
// selectGifFile: File | null = null;
// tempCategory: any;


//   constructor(
//     private _dialog: MatDialog,
//     public _servicesService: ServicesService,
//     private _fb: FormBuilder,
//     private router: Router,
//     public Http:HttpClient,
//     private dialogRef: MatDialogRef<AddproductComponent>
//   ) {}

//   ngOnInit() {
//     this.getCategory();
//     this.product_Form = this._fb.group({
//       employee_firstname: ['', [Validators.required]],
//       employee_lastname: ['', [Validators.required]],
//       employee_department: ['', [Validators.required]],
//       contact_number: ['', [Validators.required]],
//       email_id: ['', [Validators.required, Validators.email]],
//       employment_status: ['', [Validators.required]],
//       hire_date: [
//         '',
//         [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
//       ],
//     });

//     this.category_form= this._fb.group({
//       product_category: [this.product_category, [Validators.required]],
//       product_subcategory: [this.product_subcategory, [Validators.required]],
//     })
//     this.imageGroup = this._fb.group({
//       subcategory: ['', [Validators.required]],
//       product_name: ['', [Validators.required]],
//       product_description: ['', [Validators.required]],
//       brand_name: ['', [Validators.required]],
//       manufacturer_details: ['', [Validators.required]],
//       product_price: [0, [Validators.required]],
//       currency: ['', [Validators.required]],
//       product_dimensions_width: [0, [Validators.required]],
//       product_dimensions_length: [0, [Validators.required]],
//       product_dimensions_height: [0, [Validators.required]],
//       product_weight: [0, [Validators.required]],
//       available_stock: [0, [Validators.required]],
//       min_required_stock: [0, [Validators.required]]
//     })

//   }
// categorydata:any[]=[];

// getCategory(){
//   this._servicesService.getCategory().subscribe((res)=>{
//     this._servicesService.categoryData=res;
//     console.log(this._servicesService.categoryData);
//      })
// }
//   submitData() {
//     const prodData = {
//       pName: this.product_name,
//       Description: this.  product_description,
//       pCategory: this.pCategory,
//       psub_Category: this.subcategory,
//       Brand: this.  brand_name,
//       Price: this.product_price,
//       Length: this. product_dimensions_length,
//       width: this.product_dimensions_width,
//       Availablity: this.selectedValue,
//       manufacturer_details:this. manufacturer_details,
//       Weight:this.product_weight,
//       min_required_stock:this.min_required_stock,
//       available_stock:this.available_stock
//     };
//     this.productDetail.push(prodData);
//     console.log(prodData);
//     this._servicesService.prodData.push(prodData);
//     this.dialogRef.close();
//   }

//   onFileSelected(event: any) {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       const fullPath = event.target.value;
//       const parts = fullPath.split('\\');
//       const filename = parts[parts.length - 1];
//       this.pImage=filename;
//       console.log(this._servicesService.url+filename)
//     }
//   }
//   fetchData() {
//     this._servicesService.getProducts().subscribe((data) => {
//       this._servicesService.prodData=data
//       console.log("this is product data",this._servicesService.prodData);
//     });
//   }

//   category_form!:FormGroup;
//   category:any;

//   categoryF:any;
//   subcategoryF:any;
//   onsubmitCat(){
//     this.category={
//       product_category: this.categoryF,
//       product_subcategory: this.subcategoryF,
//     }
//     console.log(this.category)

//     this._servicesService.addCategory(this.category).subscribe((res)=>{
//       alert(res.message)
//     })
//   }

//   categories: any[] = [];
//   obj:any;

//   onSubmit() {
//   if ( this.selectImageFile && this.selectGifFile) {
//   this.obj={
//       subcategory: this.subcategory,
//       product_name: this.product_name,
//       product_description: this.product_description,
//       brand_name:this.brand_name ,
//       manufacturer_details: this.manufacturer_details,
//       product_price: this.product_price,
//       currency: this.currency,
//       product_dimensions_width: this.product_dimensions_width,
//       product_dimensions_length: this.product_dimensions_length,
//       product_dimensions_height: this.product_dimensions_height,
//       product_weight: this.product_weight,
//       available_stock: this.available_stock,
//       min_required_stock: this.min_required_stock
//     }
    
//     const formData = new FormData();
//     Object.keys(this.obj).forEach((key) => {
//             formData.append(key, this.obj[key]);
//           })

//     formData.append('image', this.selectImageFile);
//     formData.append('gif', this.selectGifFile);

//     console.log("this is formdata",formData);
//     this._servicesService.uploadImages(formData).subscribe(res => {
//       alert(res.message);
//     })
//   }console.log(this.obj)

//    }
//   loadImage(event: any) {
//     this.selectImageFile = event.target.files[0];
//   }

//   loadGif(event: any) {
//     this.selectGifFile = event.target.files[0]
//   }




imageGroup!: FormGroup;
categoryGroup!: FormGroup;

selectImageFile: File | null = null;
selectGifFile: File | null = null;
tempCategory: any;

categorydata: any[] = [];

showCategoryForm: boolean = false;

onShowCategoryForm() {
  this.showCategoryForm = true
}

constructor(
  public _servicesService: ServicesService,
  public _fb: FormBuilder,
  private dialogRef: MatDialogRef<AddproductComponent>
) { }

ngOnInit() {
  this._servicesService.getCategory().subscribe(data => this.categorydata = data)
  this.categoryGroup = this._fb.group({
    product_category: ['', [Validators.required]],
    product_subcategory: ['', [Validators.required]],
  })

  this.imageGroup = this._fb.group({
    subcategory: ['', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
    product_name: ['', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
    product_description: ['', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
    brand_name: ['', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
    manufacturer_details: ['', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
    product_price: ["", [Validators.required]],
    currency: ['', [Validators.required]],
    product_dimensions_width: ["", [Validators.required]],
    product_dimensions_length: ["", [Validators.required]],
    product_dimensions_height: ["", [Validators.required]],
    product_weight: ["", [Validators.required]],
    available_stock: ["", [Validators.required]],
    min_required_stock: ["", [Validators.required]]
  });
  

}
fetchData() {
  this._servicesService.getProducts().subscribe((data) => {
    this._servicesService.prodData=data
    console.log("this is product data",this._servicesService.prodData);
  });
}


onsubmitCat() {
  if (this.categoryGroup.valid) {
    this._servicesService.addCategory(this.categoryGroup.value).subscribe((res) => {
      alert(res.message);
      this.showCategoryForm = false;
    })
  }
}

onSubmit() {
  if (this.imageGroup.valid && this.selectImageFile && this.selectGifFile) {
    const formData = new FormData();
    Object.keys(this.imageGroup.value).forEach((key) => {
      formData.append(key, this.imageGroup.value[key]);
    })
    formData.append('image', this.selectImageFile);
    formData.append('gif', this.selectGifFile);

    this._servicesService.uploadImages(formData).subscribe(res => {
      alert(res.message);
      this.fetchData();
      
    })
    this.dialogRef.close();
    // 
  }
  

}

loadImage(event: any) {
  this.selectImageFile = event.target.files[0];
}

loadGif(event: any) {
  this.selectGifFile = event.target.files[0]
}


// getErrorMessage() {
//   if (this.imageGroup.product_name.hasError('required')) {
//     return 'You must enter a value';
//   }
//   return this.imageGroup.product_name.hasError('email') ? 'Not a valid email' : ''
// }
}

