import { FuiFormBuilder as f } from "@fui/forms";

export const NameDialog = f
  .dialog({
    name: f.text().label("Name").label("Name").hint("Enter name"),
    age: f.number().label("Age").min(0).max(100).placeholder("Your age")
  })
  .cancelButtonText("Cancel")
  .saveButton("Save my name")
  .headline("Personal data");
