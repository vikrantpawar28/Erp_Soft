import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from 'src/app/core/services.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-viewbill-popup',
  templateUrl: './viewbill-popup.component.html',
  styleUrls: ['./viewbill-popup.component.css']
})
export class ViewbillPopupComponent implements OnInit{
  resetForm: any;
  showOptions: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ViewbillPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _servicesService: ServicesService
  ) {
    this._servicesService.prodData;
  }
  formData: any[] = [];
  ngOnInit() {
    
    
    this.fetchData();
  }

  sendViaEmail(){
    this.showOptions=false;
  }
  sendViaWhatsApp(){
    this.showOptions=false;
  }
  
  showTable: any = true;

  editDetails() {
    if (this.showTable == true) {
      this.showTable = false;
    } else {
      this.showTable = true;
    }
  }
  productDetail: any[] = [];
  deleteDetails() {
    this._servicesService.projectData.splice(this.data.i, 1);
    alert('deleted');
    this.reset();
    this.dialogRef.close();
  }

  reset() {
   
  }
  pGif: any;
  obj: any;
  saveDetails() {
    console.log(this.data.data.id);

    this.obj = {
 
    };
    console.log('this is obj', this.obj);
    this._servicesService
      .putProjects(this.obj, this.data.data._id)
      .subscribe((res) => {
        this.fetchData();
        alert(res.message);
        console.log(res);
        this.showTable = true;
        this.dialogRef.close();
      });
  }

  cancelEdit() {
    this.obj = {};
    this.showTable = true;
  }
  fetchData() {
    console.log("mat data",this.data)

    this._servicesService.getProducts().subscribe((data) => {
      this._servicesService.prodData = data;
      console.log('this is product data', this._servicesService.prodData);
    });
  }

  // checkStatus() {
  //   if (
  //     this.data.data.project_status == 'complete' ||
  //     this.data.data.project_status == 'incomplete' ||
  //     this.data.data.project_status == 'pending'
  //   ) {
  //     return this.data.data.project_status;
  //   }
  // }
}
