import { FuiFormBuilder as f } from "@fui/forms";

export const personalData = f.form({
  firstName: f
    .text()
    .label("Firstname")
    .minLength(1)
    .hint("Name needs to be at least 1 character long"),
  lastName: f.text().label("Lastname"),
  age: f.number().label("Age").min(0).max(100),
  lang: f
    .select([
      { label: "Norwegian", value: "no" },
      { label: "Sved", value: "se" }
    ])
    .optional()
});

export const disableForm = f
  .form({
    checkbox1: f.checkbox().label("Label"),
    checkbox2: f.checkbox().label("Warn").theme("warn").defaultValue(true),
    checkbox3: f
      .checkbox()
      .label("BeforePos")
      .labelPos("before")
      .defaultValue(true),

    disable: f.select([
      { label: "disable", value: "disable" },
      { label: "enable", value: "enable" }
    ]),
    name: f.text().label("Name").hint("Disable with select above")
  })
  .disable({
    name: model => {
      return model.disable?.value === "disable";
    }
  });

export const multiSelect = f.form({
  nations: f.selectMulti([
    { label: "Norway", value: "no" },
    { label: "Sweden", value: "se" }
  ])
});
const colorOptions: { label: string; value: string }[] = [
  { label: "Red", value: "red" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
  { label: "Orange", value: "orange" }
];
export const optionalForm = f.form({
  text: f.text().label("Text"),
  textOptional: f.text().label("TextOptional").optional(),
  textArea: f.textArea().label("TextArea"),
  textAreaOptional: f.textArea().label("TextAreaOptional").optional(),
  select: f.select([...colorOptions]).label("Select"),
  selectOptional: f
    .select([...colorOptions])
    .label("SelectOptional")
    .optional(),
  selectMultiOptional: f
    .selectMulti([...colorOptions])
    .label("SelectMultiOptional")
    .optional(),
  selectMulti: f.selectMulti([...colorOptions]).label("SelectMulti"),
  number: f.number().label("Number"),
  numberOptional: f.number().label("NumberOptional").optional()
});

export const textArea = f.form({
  resizable: f.textArea().resizable(true).label("Resizable: true"),
  resizableNot: f.textArea().resizable(false).label("Resizable: false"),
  rows6: f.textArea().rows(8).label("8 Rows")
});
