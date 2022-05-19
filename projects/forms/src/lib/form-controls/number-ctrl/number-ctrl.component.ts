import { Component, OnInit, ChangeDetectionStrategy, Input } from "@angular/core";
import { BaseCtrl } from "../base.ctrl";
import { ValidatorFn, Validators } from "@angular/forms";
import { NumberField } from "../../core/field.builders";
import { NumberMeta } from "../../core/field";

@Component({
  selector: "fui-number-ctrl",
  templateUrl: "./number-ctrl.component.html",
  styleUrls: ["./number-ctrl.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberCtrlComponent extends BaseCtrl<NumberMeta<number | null>> {
  getValue(): number | null {
    const value = this.formControl.value;
    return typeof value === "number" ? value : this._field.defaultValue;
  }

  setValue(value: unknown): void {
    if (typeof value === "number") {
      this.formControl.setValue(value);
    } else {
      this.formControl.setValue(this._field.defaultValue);
    }
  }
  constructor() {
    super(new NumberMeta(null));
  }

  addValidators(field: NumberMeta) {
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
    console.log(validators);

    this.formControl.addValidators(validators);
  }
}
