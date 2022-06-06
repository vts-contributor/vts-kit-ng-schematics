import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { FooterComponentModule } from '../../ui/footer/footer.module';



@NgModule({
  declarations: [
    DashboardLayoutComponent
  ],
  imports: [
    CommonModule,
    DashboardLayoutComponentModule,
    FooterComponentModule
  ],
  exports: [
    DashboardLayoutComponent
  ]
})
export class DashboardLayoutComponentModule { }
