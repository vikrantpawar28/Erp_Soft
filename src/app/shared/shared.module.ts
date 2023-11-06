import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { AdminPayrollComponent } from './admin-payroll/admin-payroll.component';
import { EmployeeDbComponent } from './employee-db/employee-db.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { ServicesService } from '../core/services.service';
import { AddEmpComponent } from './add-emp/add-emp.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { EmpPopDetailsComponent } from './emp-pop-details/emp-pop-details.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductPopUpComponent } from './product-pop-up/product-pop-up.component';
import { ProjectComponent } from './project/project.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { ProjectPopUpComponent } from './project-pop-up/project-pop-up.component';
import { ManageBillComponent } from './Bill/manage-bill/manage-bill.component';
import { ViewbillPopupComponent } from '../shared/Bill/viewbill-popup/viewbill-popup.component';
import { EditbillPopupComponent } from '../shared/Bill/editbill-popup/editbill-popup.component';
import { LoginComponent } from '../shared/Login/login/login.component';
import { AddBillComponent } from './Bill/add-bill/add-bill.component';
import { CRMComponent } from './CRM/crm/crm.component';

import { AddLeadComponent } from './CRM/Lead_Mangment/add-lead/add-lead.component';
import { PopUpLeadComponent } from './CRM/Lead_Mangment/pop-up-lead/pop-up-lead.component';
import { LeadMangmentComponent } from './CRM/lead-mangment/lead-mangment.component';

@NgModule({
  declarations: [
    AdminPayrollComponent,
    EmployeeDbComponent,
    AddEmpComponent,
    EmpPopDetailsComponent,
    InventoryComponent,
    AddproductComponent,
    ProductPopUpComponent,
    ProjectComponent,
    AddprojectComponent,
    ProjectPopUpComponent,
    ManageBillComponent,
    ViewbillPopupComponent,
    EditbillPopupComponent,
    LoginComponent,
    AddBillComponent,
    CRMComponent,
   
    AddLeadComponent,
        PopUpLeadComponent,
        LeadMangmentComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatDividerModule
    
  ],
  exports: [ AdminPayrollComponent],
  providers: [ServicesService],
})
export class SharedModule {}
