import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from 'src/app/core/services.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-pop-up-lead',
  templateUrl: './pop-up-lead.component.html',
  styleUrls: ['./pop-up-lead.component.css'],
})
export class PopUpLeadComponent implements OnInit {
  resetForm: any;
  constructor(
    private dialogRef: MatDialogRef<PopUpLeadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _servicesService: ServicesService
  ) {
    this._servicesService.projectData;
  }
  formData: any[] = [];
  ngOnInit() {
    this.data;
    this.fetchData();
  }

  showTable: any = true;
  name: any;
  contact: any;
  follow_date: any;
  conversation: any;
  company_name: any;
  company_size: any;
  company_industry: any;
  lead_status: any;
  email: any;
  lead_tag: any;
  lead_description: any;
  editDetails() {
    if (this.showTable == true) {
      this.showTable = false;
    } else {
      this.showTable = true;
    }
  }
  productDetail: any[] = [];
  deleteDetails() {
    this._servicesService.projData.splice(this.data.i, 1);
    alert('deleted');
    this.reset();
    this.dialogRef.close();
  }

  reset() {
    this.name = '';
    this.contact = '';
    this.follow_date = '';
    this.conversation = '';
    this.company_name = '';
    this.company_size = '';
    this.company_industry = '';
    this.lead_status = '';
    this.email = '';
    this.lead_tag = '';
    this.lead_description = '';
  }
  pGif: any;
  obj: any;
  saveDetails() {
    console.log(this.data.data.id);

    this.obj = {
      name: this.name,
      contact: this.contact,
      email: this.email,
company_details:{
  company_name: this.company_name,
  company_size: this.company_size,
  industry: this.company_industry

},
lead_status: this.lead_status,
dates:{
  follow_up_date: this.follow_date,
  conversation_date: this.conversation,
},
     
     
      
      lead_tag: this.lead_tag,
      lead_description: this.lead_description,
    };
    console.log('this is obj', this.obj);
    // this._servicesService
    //   .putProjects(this.obj, this.data.data._id)
    //   .subscribe((res) => {
    //     this.fetchData();
    //     alert(res.message);
    //     console.log(res);
    //     this.showTable = true;
    //     this.dialogRef.close();
    //   });
  }

  cancelEdit() {
    this.obj = {};
    this.showTable = true;
  }
  fetchData() {
    this._servicesService.getProjects().subscribe((data) => {
      this._servicesService.projectData = data;
      this._servicesService.projData = data;
      console.log('this is product data', this._servicesService.projectData);
    });
  }

  checkStatus() {
    if (
      this.data.data.project_status == 'complete' ||
      this.data.data.project_status == 'incomplete' ||
      this.data.data.project_status == 'pending'
    ) {
      return this.data.data.project_status;
    }
  }
}
