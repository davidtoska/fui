import { FieldConfigBase, NumberMeta, SelectConfig, SelectMultiConfig, TextAreaConfig, TextConfig } from "./field";
import { LabeledValue } from "./labeled-value";

export abstract class FieldBuilderBase<OUT> {
  abstract readonly __config: FieldConfigBase<OUT>;

  abstract label(text: string): FieldBuilderBase<OUT>;

  abstract hint(text: string): FieldBuilderBase<OUT>;
}

abstract class TextFieldBase extends FieldBuilderBase<string> {
  constructor() {
    super();
  }
  abstract placeholder(text: string): TextFieldBase;

  abstract minLength(length: number): TextFieldBase;

  abstract maxLength(max: number): TextFieldBase;
}

export class TextField extends TextFieldBase {
  __config = new TextConfig("");

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

  optional() {
    this.__config.required = false;
    return this as TextField;
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

export class TextAreaField extends TextFieldBase {
  __config = new TextAreaConfig();

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
}

export class Select<V> extends FieldBuilderBase<V> {
  __config = new SelectConfig<V>();

  constructor(options: LabeledValue[]) {
    super();
    this.__config._options = options;
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

export class SelectMulti<V = LabeledValue[]> extends FieldBuilderBase<V> {
  __config = new SelectMultiConfig<V>([]);

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

export class NumberField<V = number> extends FieldBuilderBase<V> {
  __config: NumberMeta<V> = new NumberMeta<V>(null);

  constructor() {
    super();
  }

  label(text: string) {
    this.__config.label = text;
    return this;
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

export type AnyField =
  | TextField
  | NumberField
  | NumberField<number | null>
  | TextAreaField
  | Select<LabeledValue>
  | Select<LabeledValue | null>
  | SelectMulti
  | SelectMulti<LabeledValue[] | null>;
