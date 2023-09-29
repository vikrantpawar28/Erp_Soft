import { Component,OnInit,Inject } from '@angular/core';
import{MAT_DIALOG_DATA} from '@angular/material/dialog'
@Component({
  selector: 'app-emp-pop-details',
  templateUrl: './emp-pop-details.component.html',
  styleUrls: ['./emp-pop-details.component.css']
})
export class EmpPopDetailsComponent implements OnInit {  

  constructor( @Inject(MAT_DIALOG_DATA)public data:any){}

   ngOnInit() {
     console.log(this.data)
   }

}