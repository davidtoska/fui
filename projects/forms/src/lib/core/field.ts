import { LabeledValue } from "./labeled-value";

export abstract class FieldConfigBase<OUT> {
  __outputType!: OUT;
  __optionalOutputType!: OUT | null;
  initialValue: OUT | null = null;
  hint: string = "";
  label: string = "";
  required: boolean = true;
  readonly emptyValue = null;
  readonly defaultValue: OUT | null;
  placeholder = "";

  protected constructor(defaultValue: OUT | null) {
    this.defaultValue = defaultValue;
    this.initialValue = defaultValue;
  }
  abstract validate(value: unknown): value is OUT;
}

export class TextConfig extends FieldConfigBase<string> {
  minLength = 0;
  maxLength = 10000;

  constructor(defaultValue: "") {
    super(defaultValue);
  }

  validate(value: unknown): value is string {
    if (typeof value !== "string") {
      return false;
    }
    if (value.length < this.minLength) {
      return false;
    }
    if (value.length > this.minLength) {
      return false;
    }
    return true;
  }
}

export class TextAreaConfig extends TextConfig {
  resizable = false;
  _rows = 3;

  constructor() {
    super("");
  }
}

abstract class SelectConfigBase<V> extends FieldConfigBase<V> {
  _options: LabeledValue[];

  protected constructor(options: LabeledValue[]) {
    super(null);
    this._options = options;
  }
}

export class SelectMultiConfig<V> extends FieldConfigBase<V> {
  _options: LabeledValue[];

  constructor(options: LabeledValue[]) {
    super(null);
    this._options = options;
  }

  /**
   *
   * @param value
   */
  validate(value: unknown): value is V {
    const isArray = Array.isArray(value);

    // TODO
    return !this.required;
  }
}

export class SelectConfig<V> extends SelectConfigBase<V> {
  constructor() {
    super([]);
    this.required = true;
  }
  validate(value: unknown): value is V {
    const isArray = Array.isArray(value);

    // TODO
    return !this.required;
  }
}

export class NumberMeta<V = number> extends FieldConfigBase<V> {
  _min = 0;
  _max = 100;

  constructor(defaultValue: V | null) {
    super(defaultValue);
  }

  override validate(value: unknown): value is V {
    // TODO
    return typeof value === "number";
  }
}
