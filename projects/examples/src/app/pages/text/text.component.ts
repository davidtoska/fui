import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-text",
  templateUrl: "./text.component.html",
  styleUrls: ["./text.component.scss"]
})
export class TextComponent implements OnInit {
  borderColor = "#cd4c4c";
  buttonColor = "";
  textColor = "";
  month = "";
  email = "";
  search = "";
  tel = "";
  week = "";
  time = "";
  constructor() {}

  ngOnInit(): void {}

  onColorChange(color: any) {
    console.log(color);
  }

  onTimeChange(time: any) {
    console.log(time);
    console.log(typeof time === "string");
  }

  onMonthChange(month: any) {
    console.log(month);
  }

  onTextColorChange(textColor: string) {
    console.log(textColor);
  }
}
