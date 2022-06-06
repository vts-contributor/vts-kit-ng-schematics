import { DynamicFormService } from './dynamic-form.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from './form-field.model';

@Component({
  selector: 'app-c-dynamic-form',
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit {

  @Input() formFields: FormField<string>[] = [];
  form: FormGroup;
  payLoad = ' ';

  constructor(private formService: DynamicFormService) { }

  ngOnInit(): void {
    this.form = this.formService.toFormGroup(this.formFields);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

}