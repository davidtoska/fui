import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BaseCtrl } from "../base.ctrl";
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

  addValidators(field: TextConfig) {}

  setValue(value: unknown): void {
    if (typeof value === "string") {
      this.formControl.setValue(value);
    } else {
      this.formControl.setValue(this.fieldConfig.defaultValue);
    }
  }

  getValue(): TextConfig["__optionalOutput"] {
    const value = this.formControl.value;
    return typeof value === "string" ? value : this.fieldConfig.defaultValue;
  }
}
