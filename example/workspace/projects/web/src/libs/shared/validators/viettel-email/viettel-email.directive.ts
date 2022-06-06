import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';
import { viettelEmailValidator } from './viettel-email.validator'


@Directive({
  selector: '[viettelEmail][ngModel]',
  providers: [{provide: NG_VALIDATORS , useExisting: ViettelEmailValidatorDirective, multi: true}]
})
export class ViettelEmailValidatorDirective implements Validator {
  @Input() viettelEmail = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return viettelEmailValidator(this.viettelEmail)(control);
  }
}