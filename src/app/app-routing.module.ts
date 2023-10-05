import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMainComponent } from './layout/admin-main/admin-main.component';
import { EmployeeDbComponent } from './shared/employee-db/employee-db.component';
import {InventoryComponent} from './shared/inventory/inventory.component'

const routes: Routes = [
  { path: '', redirectTo: 'admin-main',pathMatch: 'full'},
  { path: 'admin-main',component: AdminMainComponent,  children:[
    {
      path:'emp_db', component:EmployeeDbComponent
    },{path:'inv',component:InventoryComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
