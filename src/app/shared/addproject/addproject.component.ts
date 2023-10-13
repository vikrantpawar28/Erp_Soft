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
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css'],
})
export class AddprojectComponent implements OnInit {
  projectGroup!: FormGroup;

  tempCategory: any;

  constructor(
    private _dialog: MatDialog,
    public _servicesService: ServicesService,
    public _fb: FormBuilder,
    private dialogRef: MatDialogRef<AddprojectComponent>
  ) {}

  ngOnInit() {
    this._servicesService.getProjects().subscribe((data) => {
      this._servicesService.projectData = data;
      console.log(data);
    });
    this.fetchData();

    this.projectGroup = this._fb.group({
      project_name: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      ],
      project_details: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      ],

      project_start_date: [
        '',
        [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
      ],
      project_due_date: [
        '',
        [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
      ],
      project_workers: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      project_status: ['', [Validators.required]],
    });
  }
  fetchData() {
    this._servicesService.getProjects().subscribe((data) => {
      this._servicesService.projectData = data;
      console.log('this is product data', this._servicesService.projectData);
    });
  }

  onSubmit() {
    if (this.projectGroup.valid) {
      console.log(this.projectGroup.value);
      this._servicesService
        .postProjects(this.projectGroup.value)
        .subscribe((res) => {
          alert(res.message);
          console.log(res);
          this.dialogRef.close();
          this.fetchData();
        });
      (error: any) => {
        console.error('Error adding data:', error);
        alert(error);
      };
    }
  }
}
