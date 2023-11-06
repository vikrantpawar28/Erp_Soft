import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogClose } from '@angular/material/dialog';
import { ServicesService } from 'src/app/core/services.service';

@Component({
  selector: 'app-editbill-popup',
  templateUrl: './editbill-popup.component.html',
  styleUrls: ['./editbill-popup.component.css']
})
export class EditbillPopupComponent implements OnInit {
  billFrom!:FormGroup

  constructor(private _fb:FormBuilder,  public _servicesService: ServicesService){ this._servicesService.getBill}
ngOnInit(): void {
  this.billFrom=this._fb.group({
    client_name:['',Validators.required],
    products:['',Validators.required],
   issue_date:['',Validators.required],
  qty:['',Validators.required],
  })
}
  onSubmit(){

  }
}
