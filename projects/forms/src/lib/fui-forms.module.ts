import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DynamicDialogComponent } from "./dialog/dynamic-dialog.component";
import { MatIconModule } from "@angular/material/icon";
import { TextCtrlComponent } from "./form-controls/text-ctrl/text-ctrl.component";
import { NumberCtrlComponent } from "./form-controls/number-ctrl/number-ctrl.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { TextAreaCtrlComponent } from "./form-controls/textarea-ctrl/text-area-ctrl.component";
import { SelectCtrlComponent } from "./form-controls/select-ctrl/select-ctrl.component";
import { MatSelectModule } from "@angular/material/select";
import { SelectMultiCtrlComponent } from "./form-controls/select-multi-ctrl/select-multi-ctrl.component";
import { DynamicFormComponent } from "./form/dynamic-form.component";
import { CheckboxCtrlComponent } from "./form-controls/checkbox-ctrl/checkbox-ctrl.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ColorCtrlComponent } from "./form-controls/color-ctrl/color-ctrl.component";
import { RadioCtrlComponent } from "./form-controls/radio-ctrl/radio-ctrl.component";
import { MatRadioModule } from "@angular/material/radio";
import { SlideToggleCtrlComponent } from "./form-controls/slide-toggle-ctrl/slide-toggle-ctrl.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@NgModule({
  declarations: [
    DynamicDialogComponent,
    TextCtrlComponent,
    TextAreaCtrlComponent,
    NumberCtrlComponent,
    CheckboxCtrlComponent,
    SelectCtrlComponent,
    SelectMultiCtrlComponent,
    DynamicFormComponent,
    RadioCtrlComponent,
    ColorCtrlComponent,
    SlideToggleCtrlComponent
  ],

  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSlideToggleModule
  ],
  exports: [DynamicFormComponent]
})
export class FuiFormsModule {}
