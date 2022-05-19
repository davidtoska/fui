import { DialogForm, DialogFormImpl } from "../dialog/dialog-form";
import { NumberField, Select, SelectMulti, TextAreaField, TextField } from "./field.builders";
import { Form, FormImpl, FormSchema } from "./form";
import { LabeledValue } from "./labeled-value";

export namespace FuiFormBuilder {
  export const dialog = <T extends FormSchema>(schema: T) => new DialogFormImpl(schema) as DialogForm<T>;
  export const form = <T extends FormSchema>(schema: T) => new FormImpl<T>(schema) as Form<T>;
  export const textField = () => new TextField();
  export const textArea = () => new TextAreaField();
  export const numberField = () => new NumberField();
  // TODO add options for select default = []
  export const select = (options: LabeledValue[] = []) => new Select<LabeledValue>(options);
  export const selectMulti = (options: LabeledValue[] = []) => new SelectMulti<LabeledValue[]>(options);
}
