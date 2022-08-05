import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormExamplesComponent } from "./pages/address-form/form-examples.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { FuiFormsModule } from "@fui/forms";
import { SeLetDirective } from "./se-let";
import { DialogFormsComponent } from "./pages/dialog-forms/dialog-forms.component";

@NgModule({
  declarations: [AppComponent, FormExamplesComponent, SeLetDirective, DialogFormsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FuiFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
