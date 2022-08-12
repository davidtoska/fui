import { Component, OnInit } from "@angular/core";
import { FuiFormBuilder as f } from "@fui/forms";

@Component({
  selector: "app-radio",
  templateUrl: "./radio.component.html",
  styleUrls: ["./radio.component.scss"]
})
export class RadioComponent implements OnInit {
  form1 = f
    .form({
      horizontal: f
        .radio([
          { label: "ONE", value: "one" },
          { label: "TWO", value: "two" },
          { label: "THREE", value: "three" }
        ])
        .label("Dette er label"),
      vertical: f
        .radio([
          { label: "ONE", value: "one" },
          { label: "TWO", value: "two" },
          { label: "THREE", value: "three" }
        ])
        .label("Vertical radio")
        .direction("column")
    })
    .showDebug();

  constructor() {}

  ngOnInit(): void {}
}
