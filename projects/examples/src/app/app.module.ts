import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormExamplesComponent } from "./pages/form-examples/form-examples.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { FuiFormsModule } from "@fui/forms";
import { SeLetDirective } from "./se-let";
import { DialogFormsComponent } from "./pages/dialog-forms/dialog-forms.component";
import { MatDividerModule } from "@angular/material/divider";
import { CheckBoxComponent } from "./pages/check-box/check-box.component";
import { RadioComponent } from "./pages/radio/radio.component";
import { SlideToggleComponent } from "./pages/slide-toggle/slide-toggle.component";
import { ButtonToggleComponent } from "./pages/button-toggle/button-toggle.component";
import { TextComponent } from "./pages/text/text.component";
import { SelectComponent } from "./pages/select/select.component";
import { NumberComponent } from "./pages/number/number.component";
import { AutoCompleteComponent } from "./pages/auto-complete/auto-complete.component";
import { DateComponent } from "./pages/date/date.component";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { ColorComponent } from "./pages/color/color.component";
import { GridComponent } from './pages/grid/grid.component';

@NgModule({
  declarations: [
    AppComponent,
    FormExamplesComponent,
    SeLetDirective,
    DialogFormsComponent,
    CheckBoxComponent,
    RadioComponent,
    SlideToggleComponent,
    ButtonToggleComponent,
    TextComponent,
    SelectComponent,
    NumberComponent,
    AutoCompleteComponent,
    DateComponent,
    ColorComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FuiFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    FormsModule,
    FuiFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
