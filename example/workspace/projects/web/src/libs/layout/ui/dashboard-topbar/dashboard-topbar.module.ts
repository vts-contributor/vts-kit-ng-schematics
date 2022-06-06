import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardTopbarComponent } from './dashboard-topbar.component';
import { FooterComponentModule } from '../footer/footer.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashboardTopbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FooterComponentModule
  ],
  exports: [
    DashboardTopbarComponent
  ]
})
export class DashboardTopbarComponentModule { }
