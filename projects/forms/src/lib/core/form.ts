import { Observable, ReplaySubject } from "rxjs";
import {
  AnyField,
  NumberField,
  Select,
  SelectMulti,
  TextAreaField,
  TextField
} from "../dialog-form/models/metadata-builders";

export interface FormSchema {
  [key: string]: AnyField;
}

export interface IDialogForm<T extends FormSchema> {
  form: FormImpl<T>;
  headline(text: string): IDialogForm<T>;

  width(px: number): IDialogForm<T>;

  cancelButtonText(text: string): IDialogForm<T>;

  saveButton(text: string, disableUntilModelChanged?: boolean): IDialogForm<T>;

  setModel(model: {
    [P in keyof T]: T[P]["_metadata"]["__optionalOutputType"];
  }): IDialogForm<T>;
  clone(): IDialogForm<T>;
}

export class DialogForm<T extends FormSchema> implements IDialogForm<T> {
  _metadata: {
    headline: string;
    width: string;
    saveButtonText: string;
    cancelButtonText: string;
    disableSaveButtonUntilModelChanged: boolean;
  };

  form: FormImpl<T>;

  constructor(schema: T) {
    this.form = new FormImpl<T>(schema);
    this._metadata = {
      headline: "",
      width: "400px",
      saveButtonText: "Save",
      cancelButtonText: "Cancel",
      disableSaveButtonUntilModelChanged: false
    };
  }

  headline(text: string) {
    this._metadata.headline = text;
    return this;
  }

  width(px: number) {
    this._metadata.width = px + "px";
    return this;
  }

  cancelButtonText(text: string) {
    this._metadata.cancelButtonText = text;
    return this;
  }

  saveButton(text: string, disableUntilModelChanged = false) {
    this._metadata.saveButtonText = text;
    this._metadata.disableSaveButtonUntilModelChanged = disableUntilModelChanged;
    return this;
  }

  setModel(model: { [P in keyof T]: T[P]["_metadata"]["__outputType"] }) {
    this.form.__updateFormSubject.next(model);
    return this;
  }
  // disableSave(mode: boolean) {
  //   this._metadata.disableSaveButtonUntilModelChanged = true;
  //   return this;
  // }

  clone(): IDialogForm<T> {
    const clonedForm = this.form.clone();
    const newDialog = new DialogForm(clonedForm.fields);
    // TODO clone metadata
    newDialog._metadata = { ...this._metadata };
    return newDialog;
  }
}

export type FormModelCallback<M, R> = (model: M) => R;

export namespace FormModel {
  export class Valid<S extends FormSchema> {
    readonly isValid: true = true;
    constructor(readonly data: { [P in keyof S]: S[P]["_metadata"]["__outputType"] }) {}
  }

  export type TypeOf<S extends FormSchema> = {
    [P in keyof S]: S[P]["_metadata"]["__outputType"];
  };

  export type OptionalTypeOf<S extends FormSchema> = {
    [P in keyof S]: S[P]["_metadata"]["__optionalOutputType"];
  };

  export class InValid<S extends FormSchema> {
    readonly isValid: false = false;
    constructor(
      readonly data: {
        [P in keyof S]: S[P]["_metadata"]["__optionalOutputType"];
      }
    ) {}
  }

  export type ChangeOutput<S extends FormSchema> = Valid<S> | InValid<S>;

  export const valid = <S extends FormSchema>(data: {
    [P in keyof S]: S[P]["_metadata"]["__outputType"];
  }) => new Valid(data);

  export const inValid = <S extends FormSchema>(data: {
    [P in keyof S]: S[P]["_metadata"]["__optionalOutputType"];
  }) => new InValid(data);
}

/**
 * Public api of the dynamic form builder
 */
export interface Form<S extends FormSchema> {
  readonly fields: S;

  /**
   * This will set the current value of the model;
   * @param model
   */
  updateForm(model: {
    [P in keyof S]: S[P]["_metadata"]["__optionalOutputType"];
  }): Form<S>;

  disableFormField(
    key: keyof S,
    callback: FormModelCallback<{ [P in keyof S]: S[P]["_metadata"]["__optionalOutputType"] }, boolean>
  ): Form<S>;

  modelChange$: Observable<FormModel.ChangeOutput<S>>;
}

export class FormImpl<S extends FormSchema> implements Form<S> {
  private modelChangeSubject = new ReplaySubject<FormModel.ChangeOutput<S>>(1);
  __updateFormSubject = new ReplaySubject<FormModel.OptionalTypeOf<S>>(1);

  private readonly disableCallBacks = new Map<string, FormModelCallback<FormModel.OptionalTypeOf<S>, boolean>>();

  readonly fields: S;
  model: { [P in keyof S]: S[P]["_metadata"]["__optionalOutputType"] };
  modelChange$ = this.modelChangeSubject.asObservable();

  constructor(fields: S) {
    this.fields = fields;
    const model: Record<string, any> = {};
    const entries = Object.entries(fields);
    entries.forEach(([key, field]) => {
      model[key] = field._metadata._initialValue;
    });
    this.model = model as FormModel.OptionalTypeOf<S>;
  }

  disableFormField(
    key: keyof S,
    callback: FormModelCallback<{ [P in keyof S]: S[P]["_metadata"]["__optionalOutputType"] }, boolean>
  ): this {
    const castedKey = key as string;
    this.disableCallBacks.set(castedKey, callback);

    return this;
  }

  /**
   * Initial value of the form.
   * (Will not update after form is rendered)
   * @param model
   */
  updateForm(model: {
    [P in keyof S]: S[P]["_metadata"]["__outputType"];
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
  _emitModel(model: FormModel.ChangeOutput<S>) {
    // TODO validate and emit??
    if (model instanceof FormModel.Valid || model instanceof FormModel.InValid) {
      this.model = model.data;
      this.modelChangeSubject.next(model);
    } else {
      console.error("Tryed to emit invalid model", model);
      // TODO LOGG ERROR??
    }
  }

  _getDisabledCallbacks() {
    return this.disableCallBacks;
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

export namespace FuiFormBuilder {
  export const dialog = <T extends FormSchema>(schema: T) => new DialogForm(schema) as IDialogForm<T>;
  export const form = <T extends FormSchema>(shema: T) => new FormImpl<T>(shema) as Form<T>;
  export const textField = () => new TextField();
  export const textArea = () => new TextAreaField();
  export const numberField = () => new NumberField();
  export const select = () => new Select();
  export const selectMulti = () => new SelectMulti();
}
