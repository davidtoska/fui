import { LabeledValue } from "../types";
import { ThemePalette } from "@angular/material/core";

export abstract class FieldConfigBase<O> {
  __output!: O;
  __optionalOutput!: O | null;
  hint: string = "";
  label: string = "";
  required: boolean = true;
  defaultValue: O | null;
  placeholder = "";

  protected constructor(defaultValue: O | null) {
    this.defaultValue = defaultValue;
  }
}

export class ColorConfig<O = string> extends FieldConfigBase<O> {
  radius = 50;
  labelPos: "before" | "after" | "above" | "below" = "after";
  constructor() {
    super(null);
  }
}

export class RadioConfig<O = LabeledValue> extends FieldConfigBase<O> {
  theme: ThemePalette = "primary";
  labelPos: "before" | "after" = "after";
  direction: "row" | "column" = "row";

  _options: LabeledValue[] = [];
  constructor(options: LabeledValue[]) {
    super(null);
    this._options = options;
  }
}

export class SlideToggleConfig<O = boolean> extends FieldConfigBase<O> {
  theme: ThemePalette = "primary";
  labelPos: "before" | "after" = "after";
  constructor(defaultValue: O) {
    super(defaultValue);
    this.required = false;
  }
}

export class CheckBoxConfig<O = boolean> extends FieldConfigBase<O> {
  themePalette: ThemePalette = "primary";
  labelPos: "before" | "after" = "after";
  indeterminate: boolean = false;
  constructor() {
    super(null);
  }
}

export class TextConfig<O = string> extends FieldConfigBase<O> {
  minLength = 0;
  maxLength = 10000;

  constructor(defaultValue: O | null) {
    super(defaultValue);
  }
}

export class TextAreaConfig<O = string> extends FieldConfigBase<O> {
  resizable = false;
  _rows = 3;
  minLength = 0;
  maxLength = 10000;
  constructor() {
    super(null);
  }
}

// abstract class SelectConfigBase<O> extends FieldConfigBase<O> {
//   _options: LabeledValue[];
//
//   protected constructor(options: LabeledValue[]) {
//     super(null);
//     this._options = options;
//   }
// }

export class SelectMultiConfig<O> extends FieldConfigBase<O> {
  _options: LabeledValue[];

  constructor(options: LabeledValue[]) {
    super(null);
    this._options = options;
  }
}

export class SelectConfig<O> extends FieldConfigBase<O> {
  _options: LabeledValue[];
  constructor(options: LabeledValue[]) {
    super(null);
    this._options = options;
    this.required = true;
  }
}
export class NumberConfig<O> extends FieldConfigBase<O> {
  _min = 0;
  _max = 100;

  constructor(defaultValue: O | null) {
    super(defaultValue);
  }
}
