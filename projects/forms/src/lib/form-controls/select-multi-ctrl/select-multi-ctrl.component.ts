import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseCtrl } from '../../dialog-form/base.ctrl';
import { LabeledValue } from '../../dialog-form/models/labeled-value';
import { Select, SelectMulti } from '../../dialog-form/models/metadata-builders';

const isNil = (item: unknown): item is null | undefined =>
  item === null || item === undefined;

@Component({
  templateUrl: './select-multi-ctrl.component.html',
  styleUrls: ['./select-multi-ctrl.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectMultiCtrlComponent extends BaseCtrl<SelectMulti> {
  getValue(): LabeledValue[] | null {
    const value = this.formControl.value;
    return Array.isArray(value) ? value : this._field._metadata._defaultValue;
  }

  setValue(value: unknown): void {
    if (Array.isArray(value)) {
      this.formControl.setValue(value);
    } else {
      this.formControl.setValue(this._field._metadata._defaultValue);
    }
  }
  addValidators(field: SelectMulti): void {}
  constructor() {
    super(new SelectMulti());
  }

  compareItems(
    item1: Select['_metadata']['_initialValue'],
    item2: Select['_metadata']['_initialValue']
  ) {
    console.log(item2);
    console.log(item1);
    if (item1 === item2) {
      return true;
    }

    if (isNil(item1) && typeof item2 === 'object') {
      return false;
    }
    if (isNil(item2) && typeof item1 === 'object') {
      return false;
    }

    return item1?.label === item2?.label;
  }
}
