import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseCtrl } from "../base.ctrl";
import { Utils } from "../../util/utils";
import { LabeledValue } from "../../types";
import { RadioConfig } from "../../core/field";

@Component({
  templateUrl: "./radio-ctrl.component.html",
  styleUrls: ["./radio-ctrl.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioCtrlComponent extends BaseCtrl<RadioConfig<any>> {
  getValue(): LabeledValue | null {
    const value = this.formControl.value;
    return Utils.isLabeledValue(value) ? value : null;
  }

  setValue(value: unknown): void {
    if (Utils.isLabeledValue(value)) {
      this.formControl.setValue(value);
    } else {
      this.formControl.setValue(this.fieldConfig.defaultValue);
    }
  }
  constructor() {
    super(new RadioConfig<any>([]));
  }

  addValidators(field: RadioConfig<any>): void {}

  compareItems(
    item1: RadioConfig<any>["__optionalOutput"],
    item2: RadioConfig<any>["__optionalOutput"]
  ) {
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
