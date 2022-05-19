import { Component, OnInit } from "@angular/core";
import { of, ReplaySubject } from "rxjs";
import { FuiFormBuilder as f } from "@fui/forms";

interface GenTest<T> {
  name: string;
  data: T;
}

@Component({
  selector: "app-address-form",
  templateUrl: "./form1.component.html",
  styleUrls: ["./form1.component.scss"]
})
export class Form1Component implements OnInit {
  // dialog1 = DialogFormService
  count = 0;
  gen = new ReplaySubject<GenTest<{ id: number }>>(1);
  form1 = f
    .form({
      id: f.textField().label("Id").hint("Your id").maxLength(20),
      name: f.textField().label("Name").minLength(5),
      lastName: f.textField().label("Lastname"),
      lang: f.select([]).options([
        { label: "Norwegian", value: "no" },
        { label: "Sved", value: "se" }
      ]),
      mult: f.selectMulti([
        { label: "label1", value: "v1" },
        { label: "label2", value: "v2" },
        { label: "label3", value: "v3" },
        { label: "label4", value: "v4" },
        { label: "label5", value: "v5" }
      ])
    })
    .disable({
      id: m => {
        return m.name === "david";
      }
    });
  data = this.gen.asObservable();
  constructor() {}

  ngOnInit(): void {
    // this.address-form.disable("name", model => {
    //   console.log(model);
    //   return true;
    // });

    // this.address-form
    setTimeout(() => {
      this.form1.setModel({ id: "david", name: "", lastName: "", lang: null, mult: null });
    }, 2000);

    setInterval(() => {
      const curr = this.count;
      this.count = curr + 2;
      this.gen.next({ name: "david ", data: { id: curr } });
    }, 2000);
  }
}
