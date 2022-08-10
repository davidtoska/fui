import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseCtrl } from "../base.ctrl";
import { Utils } from "../../util/utils";
import { LabeledValue } from "../../types";
import { SelectConfig } from "../../core/field";

@Component({
  templateUrl: "./select-ctrl.component.html",
  styleUrls: ["./select-ctrl.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectCtrlComponent extends BaseCtrl<SelectConfig<any>> {
  getValue(): LabeledValue | null {
    const value = this.formControl.value;
    return Utils.isLabeledValue(value) ? value : null;
  }

  setValue(value: unknown): void {
    if (Utils.isLabeledValue(value)) {
      this.formControl.setValue(value);
    } else {
      this.formControl.setValue(this._fieldConfig.defaultValue);
    }
  }
  constructor() {
    super(new SelectConfig([]));
  }

  addValidators(field: SelectConfig<any>): void {}

  compareItems(item1: SelectConfig<any>["__optionalOutput"], item2: SelectConfig<any>["__optionalOutput"]) {
    if (item1 === item2) {
      return true;
    }

    if (Utils.isNil(item1) && typeof item2 === "object") {
      return false;
    }
    if (Utils.isNil(item2) && typeof item1 === "object") {
      return false;
    }

    return item1?.value === item2?.value;
  }
}
