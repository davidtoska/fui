import { DialogForm, DialogFormImpl } from "../dialog/dialog-form";
import {
  CheckboxField,
  ColorField,
  NumberField,
  RadioField,
  Select,
  SelectMulti,
  SlideToggleField,
  TextAreaField,
  TextField
} from "./field.builders";
import { Form, FormImpl, FormSchema } from "./form";
import { LabeledValue } from "../types";

export namespace FuiFormBuilder {
  export const dialog = <T extends FormSchema>(schema: T) =>
    new DialogFormImpl(schema) as DialogForm<T>;
  export const form = <T extends FormSchema>(schema: T) =>
    new FormImpl<T>(schema) as Form<T>;
  export const text = () => new TextField();
  export const textArea = () => new TextAreaField();
  export const number = () => new NumberField();
  export const checkbox = () => new CheckboxField();
  export const slideToggle = () => new SlideToggleField();
  export const color = () => new ColorField();
  export const radio = (options: LabeledValue[]) =>
    new RadioField<LabeledValue>(options);
  // TODO add options for select default = []
  export const select = (options: LabeledValue[] = []) =>
    new Select<LabeledValue>(options);
  export const selectMulti = (options: LabeledValue[] = []) =>
    new SelectMulti<LabeledValue[]>(options);
}
