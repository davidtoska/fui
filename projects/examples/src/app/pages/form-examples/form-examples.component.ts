import { Component, OnInit } from "@angular/core";
import { disableForm, multiSelect, optionalForm, personalData, textArea } from "./form-examples";

@Component({
  templateUrl: "./form-examples.component.html",
  styleUrls: ["./form-examples.component.scss"]
})
export class FormExamplesComponent implements OnInit {
  private readonly TAG = "[FORM_EXAMPLE_COMPONENT]";
  personalDataForm = personalData;
  personalDataFormModel = personalData.getModel();
  disableForm = disableForm;
  disableFormModel = disableForm.getModel();
  multiSelect = multiSelect;
  multiSelectModel = multiSelect.getModel();
  optional = optionalForm;
  optionalModel = optionalForm.getModel();
  textArea = textArea;
  textAreaModel = textArea.getModel();
  constructor() {}

  ngOnInit(): void {
    this.personalDataForm.modelChange$.subscribe(model => {
      this.personalDataFormModel = model;
      if (model.isValid) {
        const data = model.data;
        console.log(data.lang);
      } else {
        const data = model.data;
        console.log(data);
      }
    });
    this.disableForm.modelChange$.subscribe(model => {
      this.disableFormModel = model;
      if (model.isValid) {
        const data = model.data;
        console.log(data);
      } else {
        const data = model.data;
        console.log(data);
      }
    });
    this.multiSelect.modelChange$.subscribe(model => {
      this.multiSelectModel = model;
      if (model.isValid) {
        const data = model.data;
        console.log(data);
      } else {
        const data = model.data;
        console.log(data);
      }
    });

    this.optional.modelChange$.subscribe(model => {
      this.optionalModel = JSON.parse(JSON.stringify(model));
      // this.optionalModel = model;
      if (model.isValid) {
        const data = model.data;
        data.textOptional = null;
        // data.textRequired = null;
        data.textAreaOptional = null;
        // data.textAreaRequired = null;
        data.selectOptional = null;
        // data.selectRequired = null;
        data.selectMultiOptional = null;
        data.numberOptional = null;
      } else {
        const data = model.data;
      }
    });

    this.textArea.modelChange$.subscribe(model => {
      this.textAreaModel = model;
      if (model.isValid) {
        const data = model.data;
        console.log(data);
      } else {
        const data = model.data;
        console.log(data);
      }
    });
    // this.form-examples

    // this.form1.setModel({ id: "david", name: "", lastName: "", lang: null, mult: null });
  }

  onFormSubmit() {
    console.log(this.personalDataForm.getModel());
  }

  updatePersonalDataModel() {
    console.log(this.personalDataForm.getModel());
    this.personalDataForm.setModel({
      firstName: "david",
      lastName: "Toska",
      lang: null,
      age: null
    });
  }
}
