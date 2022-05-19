import { FieldBase, NumberMeta, SelectMeta, SelectMultiMeta, TextAreaMeta, TextMeta } from "./field";
import { LabeledValue } from "./labeled-value";

export abstract class FieldBuilderBase<OUT> {
  abstract readonly _metadata: FieldBase<OUT>;

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
  _metadata = new TextMeta("");

  constructor() {
    super();
  }

  placeholder(text: string) {
    this._metadata._placeholder = text;
    return this;
  }

  label(text: string) {
    this._metadata._label = text;
    return this;
  }

  optional() {
    this._metadata._required = false;
    return this as TextField;
  }

  hint(text: string) {
    this._metadata._hint = text;
    return this;
  }

  minLength(length: number) {
    this._metadata._minLength = length;
    return this;
  }

  maxLength(max: number) {
    this._metadata._maxLength = max;
    return this;
  }
}

export class TextAreaField extends TextFieldBase {
  _metadata = new TextAreaMeta();

  placeholder(text: string) {
    this._metadata._placeholder = text;
    return this;
  }

  label(text: string) {
    this._metadata._label = text;
    return this;
  }

  required(isRequired: boolean) {
    this._metadata._required = isRequired;
    return this;
  }

  hint(text: string) {
    this._metadata._hint = text;
    return this;
  }

  minLength(length: number) {
    this._metadata._minLength = length;
    return this;
  }

  maxLength(max: number) {
    this._metadata._maxLength = max;
    return this;
  }

  rows(horizontalRows: number) {
    this._metadata._rows = horizontalRows;
    return this;
  }

  resizable(isResizable: boolean) {
    this._metadata._resizable = isResizable;
    return this;
  }
}

export class Select<V = LabeledValue> extends FieldBuilderBase<V> {
  _metadata = new SelectMeta<V>();

  constructor() {
    super();
  }

  label(text: string) {
    this._metadata._label = text;
    return this;
  }

  optional(): Select<LabeledValue | null> {
    this._metadata._required = false;
    return this as any as Select<LabeledValue | null>;
  }

  options(options: LabeledValue[]) {
    this._metadata._options = options;
    return this;
  }

  hint(text: string) {
    this._metadata._hint = text;
    return this;
  }
}

export class SelectMulti<V = LabeledValue[]> extends FieldBuilderBase<V> {
  _metadata = new SelectMultiMeta<V>([]);

  label(text: string) {
    this._metadata._label = text;
    return this;
  }

  optional(): SelectMulti<LabeledValue[] | null> {
    this._metadata._required = false;
    return this as any as SelectMulti<LabeledValue[] | null>;
  }

  options(options: LabeledValue[]) {
    this._metadata._options = options;
    return this;
  }

  hint(text: string) {
    this._metadata._hint = text;
    return this;
  }
}

export class NumberField<V = number> extends FieldBuilderBase<V> {
  _metadata: NumberMeta<V> = new NumberMeta<V>(null);

  constructor() {
    super();
  }

  label(text: string) {
    this._metadata._label = text;
    return this;
  }

  optional(): NumberField<number | null> {
    this._metadata._required = false;
    return this as any as NumberField<number | null>;
  }

  hint(text: string) {
    this._metadata._hint = text;
    return this;
  }

  placeholder(text: string) {
    this._metadata.placeholder = text;
    return this;
  }

  min(value: number) {
    this._metadata._min = value;
    return this;
  }

  max(value: number) {
    this._metadata._max = value;
    return this;
  }
}

export type AnyField =
  | TextField
  | NumberField
  | NumberField<number | null>
  | TextAreaField
  | Select
  | Select<LabeledValue | null>
  | SelectMulti
  | SelectMulti<LabeledValue[] | null>;
