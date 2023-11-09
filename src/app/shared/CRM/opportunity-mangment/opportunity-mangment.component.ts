import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-opportunity-mangment',
  templateUrl: './opportunity-mangment.component.html',
  styleUrls: ['./opportunity-mangment.component.css']
})
export class OpportunityMangmentComponent implements OnInit {
showadd=false;
showView=false;
ngOnInit(): void {
  
}
add_opp(){
this.showadd=!this.showadd;
} 
closeAddDetails(){
  this.showadd=false;
}
onSubmit(){

}
}
