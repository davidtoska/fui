import { Component, OnInit } from "@angular/core";
import { FuiFormBuilder as f } from "@fui/forms";

@Component({
  selector: "app-slide-toggle",
  templateUrl: "./slide-toggle.component.html",
  styleUrls: ["./slide-toggle.component.scss"]
})
export class SlideToggleComponent implements OnInit {
  form1 = f
    .form({
      checked: f.slideToggle().label("Label for true by default"),
      mustBeTrue: f.slideToggle().label("Must be checked").mustBeTrue(),
      labelBefore: f.slideToggle().label("Label before").labelPos("before")
    })
    .showDebug();

  constructor() {}

  ngOnInit(): void {}
}
