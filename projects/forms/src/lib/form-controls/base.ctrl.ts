import { Directive, HostBinding, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { AnyField } from "../core/field.builders";
import { FieldConfigBase } from "../core/field";

@Directive()
export abstract class BaseCtrl<T extends FieldConfigBase<any>> implements OnInit, OnDestroy {
  protected _field: T;
  readonly formControl = new FormControl(null);

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

  protected constructor(emptyField: T) {
    this._field = emptyField;
  }

  get field() {
    return this._field;
  }

  set field(field: T) {
    this._field = field;
    // TODO check width property, and calculate rows here?? No css in styles!
    this.formControl.patchValue(field.initialValue, {
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
