import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseCtrl } from "../base.ctrl";
import { ValidatorFn, Validators } from "@angular/forms";
import { TextAreaField } from "../../core/field.builders";
import { TextAreaConfig } from "../../core/field";

@Component({
  templateUrl: "./text-area-ctrl.component.html",
  styleUrls: ["./text-area-ctrl.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextAreaCtrlComponent extends BaseCtrl<TextAreaConfig> {
  constructor() {
    super(new TextAreaConfig());
  }

  addValidators(field: TextAreaConfig) {
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
      this.formControl.setValue(this._fieldConfig.defaultValue);
    }
  }

  getValue(): TextAreaField["__config"]["__optionalOutputType"] {
    const value = this.formControl.value;
    return typeof value === "string" ? value : "";
  }
}
