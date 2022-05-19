import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdressFormComponent } from "./pages/address-form/adress-form.component";

const routes: Routes = [{ path: "form1", component: AdressFormComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
