import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormExamplesComponent } from "./pages/address-form/form-examples.component";
import { DialogFormsComponent } from "./pages/dialog-forms/dialog-forms.component";

const routes: Routes = [
  { path: "form1", component: FormExamplesComponent },
  { path: "dialog-forms", component: DialogFormsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
