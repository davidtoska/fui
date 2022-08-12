import {
  CheckBoxConfig,
  ColorConfig,
  FieldConfigBase,
  NumberConfig,
  RadioConfig,
  SelectConfig,
  SelectMultiConfig,
  SlideToggleConfig,
  TextAreaConfig,
  TextConfig
} from "./field";
import { LabeledValue } from "../types";
import { ThemePalette } from "@angular/material/core";

export abstract class FieldBuilderBase<O> {
  abstract readonly __config: FieldConfigBase<O>;
  abstract label(text: string): FieldBuilderBase<O>;
  // abstract hint(text: string): FieldBuilderBase<O>;
}

export class SlideToggleField<O = boolean> extends FieldBuilderBase<O> {
  __config: SlideToggleConfig<O>;

  constructor() {
    super();
    const defaultValue = false as unknown as O;
    this.__config = new SlideToggleConfig<O>(defaultValue);
  }

  label(text: string) {
    this.__config.label = text;
    return this;
  }

  labelPos(pos: "before" | "after") {
    this.__config.labelPos = pos;
    return this;
  }

  theme(value: ThemePalette) {
    this.__config.theme = value;
    return this;
  }

  mustBeTrue() {
    this.__config.required = true;
    return this;
  }
  // optional() {
  //   this.__config.required = false;
  //   return this;
  // }
}

export class RadioField<O = LabeledValue> extends FieldBuilderBase<O> {
  __config: RadioConfig<O>;

  constructor(options: LabeledValue[]) {
    super();
    this.__config = new RadioConfig<O>(options);
  }

  label(text: string) {
    this.__config.label = text;
    return this;
  }

  labelPos(pos: "before" | "after") {
    this.__config.labelPos = pos;
    return this;
  }

  theme(value: ThemePalette) {
    this.__config.theme = value;
    return this;
  }

  optional(): RadioField<LabeledValue | null> {
    this.__config.required = false;
    return this as unknown as RadioField<LabeledValue | null>;
  }

  direction(direction: "row" | "column") {
    this.__config.direction = direction;
    return this;
  }

  options(options: LabeledValue[]) {
    this.__config._options = options;
    return this;
  }
}

export class ColorField<O = string> extends FieldBuilderBase<O> {
  __config = new ColorConfig<O>();
  constructor() {
    super();
  }

  label(text: string) {
    this.__config.label = text;
    return this;
  }

  labelPos(pos: "above" | "before" | "after" | "below") {
    this.__config.labelPos = pos;
    return this;
  }

  optional(): ColorField<string | null> {
    this.__config.required = false;
    return this as any as ColorField<string | null>;
  }

  // TODO ADD WARNING WHEN Optional is used with a defaultValue;
  defaultValue(value: O | null) {
    this.__config.defaultValue = value;
    return this;
  }

  radius(px: number) {
    this.__config.radius = px;
    return this;
  }

  hint(text: string) {
    this.__config.hint = text;
    return this;
  }
}

export class CheckboxField<O> extends FieldBuilderBase<O> {
  __config = new CheckBoxConfig<O>();
  constructor() {
    super();
  }

  theme(value: ThemePalette) {
    this.__config.themePalette = value;
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

  indeterminate(): CheckboxField<boolean | null> {
    this.__config.indeterminate = true;

    return this as any as CheckboxField<boolean | null>;
  }

  optional(): CheckboxField<boolean | null> {
    this.__config.required = false;
    return this as any as CheckboxField<boolean | null>;
  }

  defaultValue(value: O | null) {
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
