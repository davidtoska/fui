import { LabeledValue } from "./labeled-value";

export class FieldBase<OUT> {
  __outputType!: OUT;
  __optionalOutputType!: OUT | null;
  _initialValue: OUT | null = null;
  _hint: string = "";
  _label: string = "";
  _required: boolean = true;
  readonly _emptyValue = null;
  readonly _defaultValue: OUT | null;
  placeholder = "";

  constructor(defaultValue: OUT | null) {
    this._defaultValue = defaultValue;
    this._initialValue = defaultValue;
  }
}

export class TextMeta extends FieldBase<string> {
  _minLength = 0;
  _maxLength = 10000;
  _placeholder = "";

  constructor(defaultValue: "") {
    super(defaultValue);
  }
}

export class TextAreaMeta extends TextMeta {
  _resizable = false;
  _rows = 3;
  constructor() {
    super("");
  }
}

export class SelectMetaBase<V> extends FieldBase<V> {
  _options: LabeledValue[];

  constructor(options: LabeledValue[]) {
    super(null);
    this._options = options;
  }
}

export class SelectMultiMeta<V> extends FieldBase<V> {
  _options: LabeledValue[];

  constructor(options: LabeledValue[]) {
    super(null);
    this._options = options;
  }
}

export class SelectMeta<V> extends SelectMetaBase<V> {
  constructor() {
    super([]);
    this._required = true;
  }
}

export class NumberMeta<V = number> extends FieldBase<V> {
  _min = 0;
  _max = 100;

  constructor(defaultValue: V | null) {
    super(defaultValue);
  }
}
