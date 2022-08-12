import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseCtrl } from "../base.ctrl";
import { ValidatorFn, Validators } from "@angular/forms";
import {
  CheckBoxConfig,
  NumberConfig,
  SlideToggleConfig
} from "../../core/field";

@Component({
  templateUrl: "./slide-toggle-ctrl.component.html",
  styleUrls: ["./slide-toggle-ctrl.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideToggleCtrlComponent extends BaseCtrl<SlideToggleConfig> {
  getValue(): boolean | null {
    const value = this.formControl.value;
    return typeof value === "boolean" ? value : this.fieldConfig.defaultValue;
  }

  setValue(value: unknown): void {
    if (typeof value === "boolean") {
      this.formControl.setValue(value);
    } else {
      this.formControl.setValue(this.fieldConfig.defaultValue);
    }
  }

  constructor() {
    super(new SlideToggleConfig(false));
  }

  addValidators(field: SlideToggleConfig) {}
}
