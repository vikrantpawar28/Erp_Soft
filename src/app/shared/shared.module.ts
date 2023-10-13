import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCompanyComponent } from './admin-company/admin-company.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminPayrollComponent } from './admin-payroll/admin-payroll.component';
import { EmployeeDbComponent } from './employee-db/employee-db.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
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
@NgModule({
  declarations: [
    AdminCompanyComponent,
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
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
    
  ],
  exports: [AdminCompanyComponent, AdminPayrollComponent],
  providers: [ServicesService],
})
export class SharedModule {}
