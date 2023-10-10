import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ServicesService } from 'src/app/core/services.service';
import { HttpClient } from '@angular/common/http';



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
export class AddproductComponent implements OnInit {
  public imageGroup!: FormGroup;
  categoryForm!: FormGroup;
  product_Form!: FormGroup;
  usersData: [] = [];
  // selectedValue: any = '';
  // product_name: any = '';
  // product_description: any = '';
  // pCategory: any = '';
  // subcategory: any = '';
  // brand_name: any = '';
  // pImage:any='';
  // product_price: any = '';
  // product_dimensions_length: any = '';
  // product_dimensions_width: any = '';
  // manufacturer_details: any = '';
  // product_dimensions_height: any = '';
  // product_weight:any="";
  // available_stock:any='';
  // min_required_stock:any=''
  // productDetail: any[] = [];
  // product_category:any='';
  // product_subcategory:any='';
  // currency:any=''
  // selectImageFile: File | null = null;
  // selectGifFile: File | null = null;
  // tempCategory: any;


  selectedValue: string = '';
product_name: string = '';
product_description: string = '';
pCategory: string = '';
subcategory: string = '';
brand_name: string = '';
pImage: string = ''; // Assuming it's a URL or base64 string
product_price: number | null = null; // Assuming it's a number, use null if it's initially empty
product_dimensions_length: number | null = null; // Assuming it's a number, use null if it's initially empty
product_dimensions_width: number | null = null; // Assuming it's a number, use null if it's initially empty
manufacturer_details: string = '';
product_dimensions_height: number | null = null; // Assuming it's a number, use null if it's initially empty
product_weight: number | null = null; // Assuming it's a number, use null if it's initially empty
available_stock: number | null = null; // Assuming it's a number, use null if it's initially empty
min_required_stock: number | null = null; // Assuming it's a number, use null if it's initially empty
productDetail: any[] = [];
product_category: string = ''; // Assuming it's a string
product_subcategory: string = ''; // Assuming it's a string
currency: string = ''; // Assuming it's a string
selectImageFile: File | null = null;
selectGifFile: File | null = null;
tempCategory: any;


  constructor(
    private _dialog: MatDialog,
    public _servicesService: ServicesService,
    private _fb: FormBuilder,
    private router: Router,
    public Http:HttpClient,
    private dialogRef: MatDialogRef<AddproductComponent>
  ) {}

  ngOnInit() {
    this.getCategory();
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

    this.category_form= this._fb.group({
      product_category: [this.product_category, [Validators.required]],
      product_subcategory: [this.product_subcategory, [Validators.required]],
    })



    this.imageGroup = this._fb.group({
      subcategory: ['', [Validators.required]],
      product_name: ['', [Validators.required]],
      product_description: ['', [Validators.required]],
      brand_name: ['', [Validators.required]],
      manufacturer_details: ['', [Validators.required]],
      product_price: [0, [Validators.required]],
      currency: ['', [Validators.required]],
      product_dimensions_width: [0, [Validators.required]],
      product_dimensions_length: [0, [Validators.required]],
      product_dimensions_height: [0, [Validators.required]],
      product_weight: [0, [Validators.required]],
      available_stock: [0, [Validators.required]],
      min_required_stock: [0, [Validators.required]]
    })

    // this._imageService.getCategories().subscribe(data => {
    //   this.categories = data
    //   console.log(data)
    // })

  }
categorydata:any[]=[];

getCategory(){
  this._servicesService.getCategory().subscribe((res)=>{
    this._servicesService.categoryData=res;
    console.log(this._servicesService.categoryData);
     })
}
  submitData() {

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

  // isSubmitDisabledt() {
  //   return (!this.product_name.trim() || !this.  product_description.trim()
  //    || !this.pCategory.trim()|| !this.subcategory.trim()
  //     || !this.  brand_name.trim()|| !this.product_weight.trim()
  //    || !this.product_price.trim() || !this. product_dimensions_length.trim()
  //    || !this.product_dimensions_width.trim() || !this.selectedValue.trim()
  //    || !this.min_required_stock.trim() || !this.available_stock.trim()
  //    )
  // }

  fetchData() {
    this._servicesService.getProducts().subscribe((data) => {
      this._servicesService.prodData=data
      console.log("this is product data",this._servicesService.prodData);
    });
  }


  category_form!:FormGroup;
  category:any;




  categoryF:any;
  subcategoryF:any;
  onsubmitCat(){
    this.category={
      product_category: this.categoryF,
      product_subcategory: this.subcategoryF,
    }
    console.log(this.category)

    this._servicesService.addCategory(this.category).subscribe((res)=>{
      alert(res.message)
    })



  }

  categories: any[] = [];
  obj:any;

  onSubmit() {





   
  //   if (this.imageGroup.valid && this.selectImageFile && this.selectGifFile) {

  //     const formData = new FormData();

  //     Object.keys(this.imageGroup.value).forEach((key) => {
  //       formData.append(key, this.imageGroup.value[key]);
  //     })

  //     formData.append('image', this.selectImageFile);
  //     formData.append('gif', this.selectGifFile);

  //     console.log("this is formdata",formData);
  //     this._servicesService.uploadImages(formData).subscribe(res => {
  //       alert(res.message);
  //     })
  //   }


  
  if ( this.selectImageFile && this.selectGifFile) {


  this.obj={
      subcategory: this.subcategory,
      product_name: this.product_name,
      product_description: this.product_description,
      brand_name:this.brand_name ,
      manufacturer_details: this.manufacturer_details,
      product_price: this.product_price,
      currency: this.currency,
      product_dimensions_width: this.product_dimensions_width,
      product_dimensions_length: this.product_dimensions_length,
      product_dimensions_height: this.product_dimensions_height,
      product_weight: this.product_weight,
      available_stock: this.available_stock,
      min_required_stock: this.min_required_stock
    }
    

    const formData = new FormData();
    Object.keys(this.obj).forEach((key) => {
            formData.append(key, this.obj[key]);
          })

    formData.append('image', this.selectImageFile);
    formData.append('gif', this.selectGifFile);

    console.log("this is formdata",formData);
    this._servicesService.uploadImages(formData).subscribe(res => {
      alert(res.message);
    })
  }console.log(this.obj)

   }




  loadImage(event: any) {
    this.selectImageFile = event.target.files[0];
  }

  loadGif(event: any) {
    this.selectGifFile = event.target.files[0]
  }




}
