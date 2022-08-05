import { Component, OnInit } from "@angular/core";
import { disableForm, multiSelect, personalData } from "./forms";

@Component({
  templateUrl: "./form-examples.component.html",
  styleUrls: ["./form-examples.component.scss"]
})
export class FormExamplesComponent implements OnInit {
  personalDataForm = personalData;
  personalDataFormModel = personalData.getValue();
  disableForm = disableForm;
  disableFormModel = disableForm.getValue();
  multiSelect = multiSelect;
  multiSelectModel = multiSelect.getValue();
  constructor() {}

  ngOnInit(): void {
    this.personalDataForm.modelChange$.subscribe(model => {
      this.personalDataFormModel = model;
      if (model.isValid) {
        const data = model.data;
        console.log(data.lastName);
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

    // this.address-form

    // this.form1.setModel({ id: "david", name: "", lastName: "", lang: null, mult: null });
  }

  onFormSubmit() {
    console.log(this.personalDataForm.getValue());
  }

  updatePersonalDataModel() {
    console.log(this.personalDataForm.getValue());
    this.personalDataForm.setModel({
      firstName: "david",
      lastName: "Toska",
      lang: null,
      age: null
    });
  }
}
