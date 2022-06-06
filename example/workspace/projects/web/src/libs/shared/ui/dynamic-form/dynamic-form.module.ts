import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormInputComponent } from './dynamic-form-input.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        DynamicFormInputComponent,
        DynamicFormComponent
    ],
    declarations: [
        DynamicFormInputComponent,
        DynamicFormComponent
    ]
})
export class DynamicFormModule { }