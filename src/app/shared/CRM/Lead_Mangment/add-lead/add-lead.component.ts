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
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.css'],
})
export class AddLeadComponent implements OnInit {
  projectGroup!: FormGroup;

  tempCategory: any;

  constructor(
    private _dialog: MatDialog,
    public _servicesService: ServicesService,
    public _fb: FormBuilder,
    private dialogRef: MatDialogRef<AddLeadComponent>
  ) {}

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

  ngOnInit() {
   
  }
  fetchData() {
    this._servicesService.getProjects().subscribe((data) => {
      this._servicesService.projectData = data;
      console.log('this is product data', this._servicesService.projectData);
    });
  }

  onSubmit() {
    const obj = {
      name: this.name,
      contact: this.contact,
      email: this.email,
      company_details: {
        company_name: this.company_name,
        company_size: this.company_size,
        industry: this.company_industry,
      },
      lead_status: this.lead_status,
      dates: {
        follow_up_date: this.follow_date,
        conversation_date: this.conversation,
      },

      lead_tag: this.lead_tag,
      lead_description: this.lead_description,
    };
    console.log('this is obj', obj);
    // if (this.projectGroup.valid) {
    //   console.log(this.projectGroup.value);
    //   this._servicesService
    //     .postProjects(this.projectGroup.value)
    //     .subscribe((res) => {
    //       alert(res.message);
    //       this.fetchData();
    //       console.log(res);
    //       this.dialogRef.close();
    //     });
    //   (error: any) => {
    //     console.error('Error adding data:', error);
    //     alert(error);
    //   };
    // }
  }
}
