import { Component, OnInit } from "@angular/core";
import { FuiFormBuilder as f } from "@fui/forms";

@Component({
  selector: "app-check-box",
  templateUrl: "./check-box.component.html",
  styleUrls: ["./check-box.component.scss"]
})
export class CheckBoxComponent implements OnInit {
  inder = f.form({ inder: f.checkbox().indeterminate() }).showDebug();
  disabled = f
    .form({
      one: f
        .checkbox()
        .label("Disabled with defaultValue: true")
        .defaultValue(true),
      two: f.checkbox().label("Disabled with no default value")
    })
    .disable({
      one: model => true,
      two: model => true
    })
    .showDebug();

  constructor() {}

  ngOnInit(): void {}
}
