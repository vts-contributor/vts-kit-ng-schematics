import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from './form-field.model';

@Component({
  selector: 'app-c-dynamic-form-input',
  templateUrl: './dynamic-form-input.component.html',
})
export class DynamicFormInputComponent {

  @Input() input!: FormField<string>;
  @Input() form!: FormGroup;

  get isValid() { return this.form.controls[this.input.key].valid; }
}