import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseCtrl } from '../../dialog-form/base.ctrl';
import { Validator, ValidatorFn, Validators } from '@angular/forms';
import { TextField } from '../../dialog-form/models/metadata-builders';

@Component({
  templateUrl: './text-ctrl.component.html',
  styleUrls: ['./text-ctrl.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextCtrlComponent extends BaseCtrl<TextField> {
  constructor() {
    super(new TextField());
  }

  addValidators(field: TextField) {
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
      this.formControl.setValue(this.field._metadata._defaultValue);
    }
  }

  getValue(): TextField['_metadata']['__optionalOutputType'] {
    const value = this.formControl.value;
    return typeof value === 'string' ? value : '';
  }
}
