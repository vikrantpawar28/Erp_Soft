import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminPayrollComponent } from 'src/app/shared/admin-payroll/admin-payroll.component';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent {
  constructor(private router:Router){}
  Selected_value:any;
  open(){
    this.router.navigate(['admin-main/emp_db'])
  }

  openProductsComponent(){
    this.router.navigate(['admin-main/inv'])
  }
  OpenPayroll(){
    this.router.navigate(['admin-main/payroll'])
  }
  OpenProject(){
    this.router.navigate(['admin-main/projects'])
  }
  openAddbill(){
    this.router.navigate([''])
  }
  openManagebill(){
this.router.navigate(['admin-main/managebill'])
  }

}
