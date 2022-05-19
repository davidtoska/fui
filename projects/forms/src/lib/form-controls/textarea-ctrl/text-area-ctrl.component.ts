import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseCtrl } from '../../dialog-form/base.ctrl';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { TextAreaField, TextField } from '../../dialog-form/models/metadata-builders';

@Component({
  templateUrl: './text-area-ctrl.component.html',
  styleUrls: ['./text-area-ctrl.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaCtrlComponent extends BaseCtrl<TextAreaField> {
  constructor() {
    super(new TextAreaField());
  }

  addValidators(field: TextAreaField) {
    const validators: ValidatorFn[] = [];
    if (field._metadata._required) {
      validators.push(Validators.required);
    }
    this.formControl.addValidators(validators);
  }

  setValue(value: unknown): void {
    if (typeof value === 'string') {
      this.formControl.setValue(value);
    } else {
      this.formControl.setValue(this._field._metadata._defaultValue);
    }
  }

  getValue(): TextAreaField['_metadata']['__optionalOutputType'] {
    const value = this.formControl.value;
    return typeof value === 'string' ? value : '';
  }
}
