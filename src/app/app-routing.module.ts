import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMainComponent } from './layout/admin-main/admin-main.component';
import { EmployeeDbComponent } from './shared/employee-db/employee-db.component';
import {InventoryComponent} from './shared/inventory/inventory.component'
import { AdminPayrollComponent } from './shared/admin-payroll/admin-payroll.component';
import { ProjectComponent } from './shared/project/project.component';
import{ManageBillComponent} from './shared/Bill/manage-bill/manage-bill.component'

const routes: Routes = [
  { path: '', redirectTo: 'admin-main',pathMatch: 'full'},
  { path: 'admin-main',component: AdminMainComponent,  children:[
    { path:'emp_db', component:EmployeeDbComponent},
    {path:'inv',component:InventoryComponent},
    {path:'payroll',component:AdminPayrollComponent},
    {path:'projects',component:ProjectComponent},
    {path:'managebill',component:ManageBillComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
