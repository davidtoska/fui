import { FuiFormBuilder as f } from "@fui/forms";

export const NameDialog = f
  .dialog({
    name: f.textField().label("Name").label("Name").hint("Enter name"),
    age: f.numberField().label("Age").min(0).max(100).placeholder("Your age")
  })
  .cancelButtonText("Cancel")
  .saveButton("Save my name")
  .headline("Personal data");
