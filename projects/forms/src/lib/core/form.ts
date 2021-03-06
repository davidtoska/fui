import { Observable, ReplaySubject } from "rxjs";
import { AnyField, FieldBuilderBase } from "./field.builders";
import { FormModel } from "./form-model";
import { FieldConfigBase } from "./field";

export interface FormSchema {
  [key: string]: FieldBuilderBase<any>;
}

export interface FormSchema2 {
  [key: string]: FieldConfigBase<any>;
}

// export type FormModelCallback<M, R> = (model: M) => R;

/**
 * Public api of the dynamic form builder
 */
export interface Form<S extends FormSchema> {
  readonly fields: S;

  /**
   * This will set the current value of the model;
   * @param model
   */
  setModel(model: {
    [P in keyof S]: S[P]["__config"]["__optionalOutputType"];
  }): Form<S>;

  disable(functions: {
    [P in keyof S]?: (model: { [P in keyof S]: S[P]["__config"]["__optionalOutputType"] }) => boolean;
  }): Form<S>;

  getValue(): FormModel.Valid<S> | FormModel.InValid<S>;
  modelChange$: Observable<FormModel.Value<S>>;
}

export class FormImpl<S extends FormSchema> implements Form<S> {
  private modelChangeSubject = new ReplaySubject<FormModel.Value<S>>(1);
  __updateFormSubject = new ReplaySubject<FormModel.OptionalTypeOf<S>>(1);

  private disableMap: {
    [P in keyof S]?: (model: { [P in keyof S]: S[P]["__config"]["__optionalOutputType"] }) => boolean;
  } = {};

  readonly fields: S;
  // model: { [P in keyof S]: S[P]["__config"]["__optionalOutputType"] };
  model2: FormModel.Value<S>;
  modelChange$ = this.modelChangeSubject.asObservable();

  constructor(fields: S) {
    this.fields = fields;
    const model: Record<string, any> = {};
    const entries = Object.entries(fields);
    entries.forEach(([key, field]) => {
      model[key] = field.__config.initialValue;
    });
    const castedModel = model as FormModel.OptionalTypeOf<S>;
    // TODO VALIDATE MODEL HERE!! Seems like config object is right place for validation-fn
    this.model2 = FormModel.inValid(castedModel);
  }

  disable(resolver: {
    [P in keyof S]?: (model: { [P in keyof S]: S[P]["__config"]["__optionalOutputType"] }) => boolean;
  }) {
    this.disableMap = resolver;
    return this;
  }

  getValue(): FormModel.Value<S> {
    return this.model2;
  }

  /**
   * Initial value of the form.
   * (Will not update after form is rendered)
   * @param model
   */
  setModel(model: {
    [P in keyof S]: S[P]["__config"]["__outputType"];
  }) {
    this.__updateFormSubject.next(model);
    return this;
  }

  /**
   * @Internal
   * @param model
   * This method is used by the dynamic-form component
   * to emit the current state of the model after the model changed.
   */
  _emitModel(model: FormModel.Value<S>) {
    this.model2 = model;
    this.modelChangeSubject.next(model);
  }

  _getDisabledCallbacks() {
    return this.disableMap;
  }

  clone(): Form<S> {
    return new FormImpl(this.fields);
  }

  /**
   * @Internal
   * Will remove all listeners, or maybe not needed?
   */
  _cleanUp() {}
}
