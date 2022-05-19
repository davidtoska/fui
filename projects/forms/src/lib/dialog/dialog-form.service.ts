import { Injectable, Injector } from "@angular/core";
import { Overlay } from "@angular/cdk/overlay";
import { DialogFormRef } from "./dialog-form-ref";
import { ComponentPortal } from "@angular/cdk/portal";

import { DynamicDialogComponent } from "./dynamic-dialog.component";
import { FormSchema } from "../core/form";
import { DialogForm, DialogFormImpl } from "./dialog-form";

@Injectable({
  providedIn: "root"
})
export class DialogFormService {
  constructor(private readonly overlay: Overlay, private injector: Injector) {}
  open<T extends FormSchema>(form: DialogForm<T>) {
    const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true
    });

    const casted = form as DialogFormImpl<T>;
    const fuiDialogRef = new DialogFormRef(overlayRef, casted);

    const dialogInjector = Injector.create({
      providers: [{ provide: DialogFormRef, useValue: fuiDialogRef }],
      parent: this.injector
    });

    overlayRef.attach(new ComponentPortal(DynamicDialogComponent, null, dialogInjector));
    return fuiDialogRef;
  }
}
