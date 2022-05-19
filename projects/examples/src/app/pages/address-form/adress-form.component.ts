import { Component, OnInit } from "@angular/core";
import { FuiFormBuilder as f } from "@fui/forms";

@Component({
  selector: "app-address-form",
  templateUrl: "./adress-form.component.html",
  styleUrls: ["./adress-form.component.scss"]
})
export class AdressFormComponent implements OnInit {
  form1 = f
    .form({
      firstName: f.textField().label("Firstname"),
      lastName: f.textField().label("Lastname"),
      age: f.numberField().label("Age").min(0).max(100),
      lang: f.select([
        { label: "Norwegian", value: "no" },
        { label: "Sved", value: "se" }
      ]),
      textField: f
        .textArea()
        .hint("Description")
        .resizable(true)
        .maxLength(1000)
        .placeholder("Long description")
        .minLength(20),
      mult: f.selectMulti([
        { label: "label1", value: "v1" },
        { label: "label2", value: "v2" },
        { label: "label3", value: "v3" },
        { label: "label4", value: "v4" },
        { label: "label5", value: "v5" },
        { label: "label6", value: "v6" },
        { label: "label7", value: "v7" }
      ])
    })
    .disable({
      firstName: model => {
        return typeof model.age === "number" && model.age > 80;
      }
    });
  constructor() {}

  ngOnInit(): void {
    this.form1.modelChange$.subscribe(res => {
      if (res.isValid) {
        const data = res.data;
        console.log(data);
        data.mult.forEach(item => {
          console.log(item.label);
        });
      } else {
        const data = res.data;
      }
    });

    // this.address-form
    setTimeout(() => {
      this.form1.setModel({
        firstName: "david",
        lastName: "Toska",
        lang: null,
        mult: null,
        age: null,
        textField: "test test"
      });
      // this.form1.setModel({ id: "david", name: "", lastName: "", lang: null, mult: null });
    }, 2000);
  }

  onFormSubmit() {
    console.log(this.form1);
  }
}
