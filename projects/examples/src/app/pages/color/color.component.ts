import { Component, OnInit } from "@angular/core";
import { FuiFormBuilder as f } from "@fui/forms";

@Component({
  selector: "app-color",
  templateUrl: "./color.component.html",
  styleUrls: ["./color.component.scss"]
})
export class ColorComponent implements OnInit {
  plain = f
    .form({
      radius100: f.color().label("Border-color r:100").radius(100),
      above: f
        .color()
        .label("Label-above")
        .labelPos("above")
        .hint("This is a hint"),
      after: f.color().label("Label-right").labelPos("after"),
      below: f.color().label("Label-below").labelPos("below"),
      before: f.color().label("Label-left").labelPos("before"),
      noLabel: f.color().labelPos("before").hint("No label")
    })
    .showDebug();

  constructor() {}

  ngOnInit(): void {}
}
