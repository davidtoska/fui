import {
  CheckBoxConfig,
  FieldConfigBase,
  NumberConfig,
  SelectConfig,
  SelectMultiConfig,
  TextAreaConfig,
  TextConfig
} from "./field";
import { LabeledValue } from "../types";
import { ThemePalette } from "@angular/material/core";

export abstract class FieldBuilderBase<O> {
  abstract readonly __config: FieldConfigBase<O>;
  abstract label(text: string): FieldBuilderBase<O>;
  abstract hint(text: string): FieldBuilderBase<O>;
}

export class CheckboxField<O> extends FieldBuilderBase<O> {
  __config = new CheckBoxConfig<O>();
  constructor(defaultValue: O) {
    super();
    this.__config.defaultValue = defaultValue;
  }

  // TODO ADD hint in html
  hint(text: string): CheckboxField<O> {
    this.__config.hint = text;
    return this;
  }

  color(theme: ThemePalette) {
    this.__config.color = theme;
    return this;
  }

  label(text: string) {
    this.__config.label = text;
    return this;
  }

  labelPos(position: "before" | "after") {
    this.__config.labelPos = position;
    return this;
  }

  optional(): CheckboxField<boolean | null> {
    this.__config.required = false;
    return this as any as CheckboxField<boolean | null>;
  }

  defaultValue(value: O) {
    this.__config.defaultValue = value;
    return this;
  }

  // hint(text: string) {
  //   this.__config.hint = text;
  //   return this;
  // }
}

export class TextField<O = string> extends FieldBuilderBase<O> {
  __config: TextConfig<O> = new TextConfig<O>(null);

  constructor() {
    super();
  }

  placeholder(text: string) {
    this.__config.placeholder = text;
    return this;
  }

  label(text: string) {
    this.__config.label = text;
    return this;
  }

  optional(): TextField<O | null> {
    this.__config.required = false;
    return this as TextField<O | null>;
  }

  hint(text: string) {
    this.__config.hint = text;
    return this;
  }

  minLength(length: number) {
    this.__config.minLength = length;
    return this;
  }

  maxLength(max: number) {
    this.__config.maxLength = max;
    return this;
  }
}

export class TextAreaField<O = string> extends FieldBuilderBase<O> {
  __config: TextAreaConfig<O> = new TextAreaConfig<O>();

  placeholder(text: string) {
    this.__config.placeholder = text;
    return this;
  }

  label(text: string) {
    this.__config.label = text;
    return this;
  }

  required(isRequired: boolean) {
    this.__config.required = isRequired;
    return this;
  }

  hint(text: string) {
    this.__config.hint = text;
    return this;
  }

  minLength(length: number) {
    this.__config.minLength = length;
    return this;
  }

  maxLength(max: number) {
    this.__config.maxLength = max;
    return this;
  }

  rows(horizontalRows: number) {
    this.__config._rows = horizontalRows;
    return this;
  }

  // TODO THIS DONT WORK!!
  resizable(isResizable: boolean) {
    this.__config.resizable = isResizable;
    return this;
  }

  optional(): TextAreaField<null | string> {
    this.__config.required = false;
    return this as any as TextAreaField<null | string>;
  }
}

export class Select<O> extends FieldBuilderBase<O> {
  __config: SelectConfig<O>;

  constructor(options: LabeledValue[]) {
    super();
    this.__config = new SelectConfig<O>(options);
  }

  label(text: string) {
    this.__config.label = text;
    return this;
  }

  optional(): Select<LabeledValue | null> {
    this.__config.required = false;
    return this as any as Select<LabeledValue | null>;
  }

  options(options: LabeledValue[]) {
    this.__config._options = options;
    return this;
  }

  hint(text: string) {
    this.__config.hint = text;
    return this;
  }
}

export class SelectMulti<O> extends FieldBuilderBase<O> {
  __config = new SelectMultiConfig<O>([]);

  constructor(options: ReadonlyArray<LabeledValue>) {
    super();
    this.__config._options = [...options];
  }

  label(text: string) {
    this.__config.label = text;
    return this;
  }

  optional(): SelectMulti<LabeledValue[] | null> {
    this.__config.required = false;
    return this as any as SelectMulti<LabeledValue[] | null>;
  }

  options(options: LabeledValue[]) {
    this.__config._options = options;
    return this;
  }

  hint(text: string) {
    this.__config.hint = text;
    return this;
  }
}

export class NumberField<O = number> extends FieldBuilderBase<O> {
  __config: NumberConfig<O> = new NumberConfig<O>(null);

  constructor() {
    super();
  }

  label(text: string) {
    this.__config.label = text;
    return this;
  }

  defaultValue(value: O) {
    const casted = this as NumberField<O>;
    casted.__config.defaultValue = value;
    return this as any as NumberField<number>;
  }

  optional(): NumberField<number | null> {
    this.__config.required = false;
    return this as any as NumberField<number | null>;
  }

  hint(text: string) {
    this.__config.hint = text;
    return this;
  }

  placeholder(text: string) {
    this.__config.placeholder = text;
    return this;
  }

  min(value: number) {
    this.__config._min = value;
    return this;
  }

  max(value: number) {
    this.__config._max = value;
    return this;
  }
}

// export type AnyField =
//   | TextField
//   | NumberField<number>
//   | NumberField<number | null>
//   | TextAreaField
//   | Select<LabeledValue>
//   | Select<LabeledValue | null>
//   | SelectMulti
//   | SelectMulti<LabeledValue[] | null>;
