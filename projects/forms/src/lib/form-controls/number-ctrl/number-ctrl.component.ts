import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { BaseCtrl } from '../../dialog-form/base.ctrl';
import { ValidatorFn, Validators } from '@angular/forms';
import { NumberField } from '../../dialog-form/models/metadata-builders';

@Component({
  selector: 'fui-number-ctrl',
  templateUrl: './number-ctrl.component.html',
  styleUrls: ['./number-ctrl.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberCtrlComponent extends BaseCtrl<NumberField<number | null>> {
  getValue(): number | null {
    const value = this.formControl.value;
    return typeof value === 'number'
      ? value
      : this._field._metadata._defaultValue;
  }

  setValue(value: unknown): void {
    if (typeof value === 'number') {
      this.formControl.setValue(value);
    } else {
      this.formControl.setValue(this._field._metadata._defaultValue);
    }
  }
  constructor() {
    super(new NumberField());
  }

  addValidators(field: NumberField) {
    const validators: ValidatorFn[] = [];
    const min = field._metadata._min;
    const max = field._metadata._max;
    if (field._metadata._required) {
      validators.push(Validators.required);
    }
    if (typeof min === 'number') {
      validators.push(Validators.min(min));
    }

    if (typeof max === 'number') {
      validators.push(Validators.max(max));
    }
    console.log(validators);

    this.formControl.addValidators(validators);
  }
}
