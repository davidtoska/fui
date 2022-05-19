import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseCtrl } from "../base.ctrl";
// import { Select } from "../../core/field.builders";
import { Validation } from "../../util/validation";
import { LabeledValue } from "../../core/labeled-value";
import { SelectConfig } from "../../core/field";

@Component({
  templateUrl: "./select-ctrl.component.html",
  styleUrls: ["./select-ctrl.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectCtrlComponent extends BaseCtrl<SelectConfig<any>> {
  getValue(): LabeledValue | null {
    const value = this.formControl.value;
    return Validation.isLabeledValue(value) ? value : null;
  }
  setValue(value: unknown): void {
    const key1: keyof LabeledValue = "label";
    const key2: keyof LabeledValue = "value";

    if (Validation.hasKey(value, key1) && Validation.hasKey(value, key2)) {
      this.formControl.setValue(value);
    } else {
      this.formControl.setValue(this._field.defaultValue);
    }
  }
  constructor() {
    super(new SelectConfig());
  }
  addValidators(field: SelectConfig<any>): void {}
  compareItems(item1: SelectConfig<any>["__optionalOutputType"], item2: SelectConfig<any>["__optionalOutputType"]) {
    if (item1 === item2) {
      return true;
    }

    if (Validation.isNil(item1) && typeof item2 === "object") {
      return false;
    }
    if (Validation.isNil(item2) && typeof item1 === "object") {
      return false;
    }

    return item1?.value === item2?.value;
  }

  // validateValue(value: unknown): value is LabeledValue | null {
  //
  // }
}
