import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseCtrl } from "../base.ctrl";
import { LabeledValue } from "../../types";
import { SelectMultiConfig } from "../../core/field";

const isNil = (item: unknown): item is null | undefined => item === null || item === undefined;

@Component({
  templateUrl: "./select-multi-ctrl.component.html",
  styleUrls: ["./select-multi-ctrl.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectMultiCtrlComponent extends BaseCtrl<SelectMultiConfig<any>> {
  getValue(): LabeledValue[] | null {
    const value = this.formControl.value;
    return Array.isArray(value) ? value : this._fieldConfig.defaultValue;
  }

  setValue(value: unknown): void {
    if (Array.isArray(value)) {
      this.formControl.setValue(value);
    } else {
      this.formControl.setValue(this._fieldConfig.defaultValue);
    }
  }

  addValidators(field: SelectMultiConfig<any>): void {}

  constructor() {
    super(new SelectMultiConfig([]));
  }

  compareItems(item1: SelectMultiConfig<any>["__optionalOutput"], item2: SelectMultiConfig<any>["defaultValue"]) {
    // console.log(item2);
    // console.log(item1);
    if (item1 === item2) {
      return true;
    }

    if (isNil(item1) && typeof item2 === "object") {
      return false;
    }
    if (isNil(item2) && typeof item1 === "object") {
      return false;
    }

    return item1?.label === item2?.label;
  }
}
