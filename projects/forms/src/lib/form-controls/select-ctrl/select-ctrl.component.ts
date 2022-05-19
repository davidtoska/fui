import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseCtrl } from "../../dialog-form/base.ctrl";
import { Select } from "../../dialog-form/models/metadata-builders";
import { LabeledValue } from "../../dialog-form/models/labeled-value";
import { V } from "../../utils";

const isNil = (item: unknown): item is null | undefined => item === null || item === undefined;

@Component({
  templateUrl: "./select-ctrl.component.html",
  styleUrls: ["./select-ctrl.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectCtrlComponent extends BaseCtrl<Select> {
  getValue(): LabeledValue | null {
    const value = this.formControl.value;
    return LabeledValue.is(value) ? value : null;
  }
  setValue(value: unknown): void {
    const key1: keyof LabeledValue = "label";
    const key2: keyof LabeledValue = "value";

    if (V.hasKey(value, key1) && V.hasKey(value, key2)) {
      this.formControl.setValue(value);
    } else {
      this.formControl.setValue(this._field._metadata._defaultValue);
    }
  }
  constructor() {
    super(new Select());
  }
  addValidators(field: Select): void {}
  compareItems(item1: Select["_metadata"]["__optionalOutputType"], item2: Select["_metadata"]["__optionalOutputType"]) {
    if (item1 === item2) {
      return true;
    }

    if (isNil(item1) && typeof item2 === "object") {
      return false;
    }
    if (isNil(item2) && typeof item1 === "object") {
      return false;
    }

    return item1?.value === item2?.value;
  }

  // validateValue(value: unknown): value is LabeledValue | null {
  //
  // }
}
