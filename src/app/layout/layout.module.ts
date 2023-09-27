import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import {MatDividerModule} from '@angular/material/divider';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminMainComponent],
  imports: [CommonModule, NzDividerModule,MatDividerModule,SharedModule,RouterModule],
  exports: [AdminMainComponent],
})
export class LayoutModule {}
