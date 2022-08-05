import { Directive, HostBinding, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FieldConfigBase } from "../core/field";
import { LabeledValue } from "../types";

type FormControlValues = string | number | null | Array<LabeledValue> | ReadonlyArray<LabeledValue> | LabeledValue;

@Directive()
export abstract class BaseCtrl<T extends FieldConfigBase<any>> implements OnInit, OnDestroy {
  /**
   * Configuration object for this form-control
   * @protected
   */
  protected _fieldConfig: T;

  readonly formControl = new FormControl<FormControlValues>(null);

  set disabled(isDisabled: boolean) {
    if (isDisabled) {
      this.formControl.disable({ emitEvent: false });
    } else {
      this.formControl.enable({ emitEvent: false });
    }
  }

  // TODO ADD configuration for margin-bottom and maybe columns??
  @HostBinding("style.marginBottom") marginBottom = "14px";
  @HostBinding("style.display") display = "inline-block";
  @HostBinding("style.minWidth") minWidth = "150px";
  @HostBinding("style.width") width = "100%";

  /**
   * The default configuration for this form-field;
   * @param emptyField
   * @protected
   */
  protected constructor(emptyField: T) {
    this._fieldConfig = emptyField;
  }

  get fieldConfig() {
    return this._fieldConfig;
  }

  set fieldConfig(field: T) {
    this._fieldConfig = field;
    // TODO check width property, and calculate rows here?? No css in styles!
    this.formControl.patchValue(field.defaultValue, {
      emitEvent: true
    });
    this.addValidators(field);
  }

  abstract addValidators(field: T): void;

  /**
   * Validate and update form-control
   * @param value
   */
  abstract setValue(value: unknown): void;

  abstract getValue(): T["__optionalOutputType"];

  ngOnDestroy(): void {}

  ngOnInit(): void {}
}
