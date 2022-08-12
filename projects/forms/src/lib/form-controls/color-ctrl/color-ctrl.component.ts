import { ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";
import { BaseCtrl } from "../base.ctrl";
import { ColorConfig } from "../../core/field";

@Component({
  templateUrl: "./color-ctrl.component.html",
  styleUrls: ["./color-ctrl.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorCtrlComponent extends BaseCtrl<ColorConfig> {
  get radius() {
    // TODO CLAMP
    return this.fieldConfig.radius + "px";
  }

  getValue(): string | null {
    const value = this.formControl.value;
    return typeof value === "string" ? value : this.fieldConfig.defaultValue;
  }

  setValue(value: unknown): void {
    if (typeof value === "string") {
      this.formControl.setValue(value);
    } else {
      this.formControl.setValue(this.fieldConfig.defaultValue);
    }
  }
  constructor() {
    super(new ColorConfig());
  }

  addValidators(field: ColorConfig) {}
}
