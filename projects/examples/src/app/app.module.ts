import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AdressFormComponent } from "./pages/address-form/adress-form.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { FuiFormsModule } from "../../../forms/src/public-api";
import { SeLetDirective } from "./se-let";

@NgModule({
  declarations: [AppComponent, AdressFormComponent, SeLetDirective],
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
