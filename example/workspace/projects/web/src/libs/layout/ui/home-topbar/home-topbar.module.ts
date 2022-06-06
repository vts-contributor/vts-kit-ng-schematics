import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTopbarComponent } from './home-topbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeTopbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HomeTopbarComponent
  ]
})
export class HomeTopbarComponentModule { }
