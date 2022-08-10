import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormExamplesComponent } from "./pages/form-examples/form-examples.component";
import { DialogFormsComponent } from "./pages/dialog-forms/dialog-forms.component";
import { SelectComponent } from "./pages/select/select.component";
import { CheckBoxComponent } from "./pages/check-box/check-box.component";
import { NumberComponent } from "./pages/number/number.component";
import { TextComponent } from "./pages/text/text.component";
import { SlideToggleComponent } from "./pages/slide-toggle/slide-toggle.component";
import { RadioComponent } from "./pages/radio/radio.component";
import { ButtonToggleComponent } from "./pages/button-toggle/button-toggle.component";
import { AutoCompleteComponent } from "./pages/auto-complete/auto-complete.component";
import { DateComponent } from "./pages/date/date.component";
import { ColorComponent } from "./pages/color/color.component";

const routes: Routes = [
  { path: "text", component: TextComponent },
  { path: "number", component: NumberComponent },
  { path: "check-box", component: CheckBoxComponent },
  { path: "radio", component: RadioComponent },
  { path: "auto-complete", component: AutoCompleteComponent },
  { path: "select", component: SelectComponent },
  { path: "slide-toggle", component: SlideToggleComponent },
  { path: "button-toggle", component: ButtonToggleComponent },
  { path: "color", component: ColorComponent },
  { path: "date", component: DateComponent },
  { path: "form1", component: FormExamplesComponent },
  { path: "dialog-forms", component: DialogFormsComponent },
  { path: "**", redirectTo: "text" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
