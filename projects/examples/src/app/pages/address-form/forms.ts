import { FuiFormBuilder as f } from "@fui/forms";

export const personalData = f.form({
  firstName: f.textField().label("Firstname").minLength(1).hint("Name needs to be at least 1 character long"),
  lastName: f.textField().label("Lastname"),
  age: f.numberField().label("Age").min(0).max(100),
  lang: f.select([
    { label: "Norwegian", value: "no" },
    { label: "Sved", value: "se" }
  ])
});

export const disableForm = f
  .form({
    disable: f.select([
      { label: "disable", value: "disable" },
      { label: "enable", value: "enable" }
    ]),
    name: f.textField().label("Name").hint("Disable with select above")
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
