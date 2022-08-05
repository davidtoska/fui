import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseCtrl } from "../base.ctrl";
import { ValidatorFn, Validators } from "@angular/forms";
import { NumberConfig } from "../../core/field";

@Component({
  selector: "fui-number-ctrl",
  templateUrl: "./number-ctrl.component.html",
  styleUrls: ["./number-ctrl.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberCtrlComponent extends BaseCtrl<NumberConfig<number | null>> {
  getValue(): number | null {
    const value = this.formControl.value;
    return typeof value === "number" ? value : this._fieldConfig.defaultValue;
  }

  setValue(value: unknown): void {
    if (typeof value === "number") {
      this.formControl.setValue(value);
    } else {
      this.formControl.setValue(this._fieldConfig.defaultValue);
    }
  }
  constructor() {
    super(new NumberConfig(null));
  }

  addValidators(field: NumberConfig<number>) {
    const validators: ValidatorFn[] = [];
    const min = field._min;
    const max = field._max;
    if (field.required) {
      validators.push(Validators.required);
    }
    if (typeof min === "number") {
      validators.push(Validators.min(min));
    }

    if (typeof max === "number") {
      validators.push(Validators.max(max));
    }
    this.formControl.addValidators(validators);
  }
}
