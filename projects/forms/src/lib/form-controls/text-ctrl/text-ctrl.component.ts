import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseCtrl } from "../base.ctrl";
import { ValidatorFn, Validators } from "@angular/forms";
import { TextConfig } from "../../core/field";

@Component({
  templateUrl: "./text-ctrl.component.html",
  styleUrls: ["./text-ctrl.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextCtrlComponent extends BaseCtrl<TextConfig> {
  constructor() {
    super(new TextConfig(""));
  }

  addValidators(field: TextConfig) {
    const validators: ValidatorFn[] = [];
    if (field.required) {
      validators.push(Validators.required);
    }
    this.formControl.addValidators(validators);
  }

  setValue(value: unknown): void {
    if (typeof value === "string") {
      this.formControl.setValue(value);
    } else {
      this.formControl.setValue(this.field.defaultValue);
    }
  }

  getValue(): TextConfig["__optionalOutputType"] {
    const value = this.formControl.value;
    return typeof value === "string" ? value : "";
  }
}
