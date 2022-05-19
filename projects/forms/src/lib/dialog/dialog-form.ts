import { FormImpl, FormSchema } from "./form";

export interface DialogForm<T extends FormSchema> {
  form: FormImpl<T>;

  headline(text: string): DialogForm<T>;

  width(px: number): DialogForm<T>;

  cancelButtonText(text: string): DialogForm<T>;

  saveButton(text: string, disableUntilModelChanged?: boolean): DialogForm<T>;

  setModel(model: {
    [P in keyof T]: T[P]["_metadata"]["__optionalOutputType"];
  }): DialogForm<T>;

  clone(): DialogForm<T>;
}

export class DialogFormImpl<T extends FormSchema> implements DialogForm<T> {
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

  clone(): DialogForm<T> {
    const clonedForm = this.form.clone();
    const newDialog = new DialogFormImpl(clonedForm.fields);
    // TODO clone metadata
    newDialog._metadata = { ...this._metadata };
    return newDialog;
  }
}
