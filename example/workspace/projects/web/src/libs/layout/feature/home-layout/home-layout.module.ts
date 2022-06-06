import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './home-layout.component';
import { HomeTopbarComponentModule } from '../../ui/home-topbar/home-topbar.module';
import { FooterComponentModule } from '../../ui/footer/footer.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeTopbarComponentModule,
    FooterComponentModule
  ],
  exports: [
    HomeLayoutComponent
  ]
})
export class HomeLayoutComponentModule { }
