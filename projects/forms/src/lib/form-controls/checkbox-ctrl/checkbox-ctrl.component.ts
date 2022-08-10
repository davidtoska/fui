import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseCtrl } from "../base.ctrl";
import { ValidatorFn, Validators } from "@angular/forms";
import { CheckBoxConfig, NumberConfig } from "../../core/field";

@Component({
  templateUrl: "./checkbox-ctrl.component.html",
  styleUrls: ["./checkbox-ctrl.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxCtrlComponent extends BaseCtrl<CheckBoxConfig<boolean>> {
  getValue(): boolean | null {
    const value = this.formControl.value;

    return typeof value === "boolean" ? value : this._fieldConfig.defaultValue;
  }

  setValue(value: unknown): void {
    if (typeof value === "boolean") {
      this.formControl.setValue(value);
    } else {
      this.formControl.setValue(this._fieldConfig.defaultValue);
    }
  }
  constructor() {
    super(new CheckBoxConfig<boolean>());
  }

  addValidators(field: CheckBoxConfig<boolean>) {}
}
