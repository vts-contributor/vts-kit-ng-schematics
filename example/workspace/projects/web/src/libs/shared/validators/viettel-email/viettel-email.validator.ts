import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function viettelEmailValidator(options: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value = control.value
    return !/@viettel.com.vn/.test(value) ? { notViettelEmail: true } : null
  };
}