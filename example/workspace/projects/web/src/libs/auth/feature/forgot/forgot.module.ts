import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotComponent } from './forgot.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ForgotComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ForgotComponent}])
  ],
  exports: [
    ForgotComponent
  ]
})
export class ForgotComponentModule { }
