import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { DialogFormRef, DialogMessage } from "../dialog-form-ref";
import { Subscription } from "rxjs";
import { FormImpl, FormSchema } from "../../core/form";
import { DynamicFormComponent } from "../../form/dynamic-form/dynamic-form.component";

@Component({
  selector: "fui-dynamic-dialog-form",
  templateUrl: "./dynamic-dialog.component.html",
  styleUrls: ["./dynamic-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicDialogComponent implements OnInit, OnDestroy, AfterViewInit {
  lastMessage: DialogMessage = { kind: "show-form" };
  headline = "";
  saveButtonText = "Save";
  cancelButtonText = "Cancel";
  form: FormImpl<FormSchema>;

  private readonly subs: Subscription[] = [];

  @HostBinding("style.width") width = "600px";
  @HostBinding("style.maxWidth") maxWidth = "1200px";
  @HostBinding("style.minWidth") mimWidth = "300px";
  // @HostBinding('style.padding') padding = '2px';
  // @ViewChild()

  @ViewChild("formFields", { read: ViewContainerRef })
  public formFields!: ViewContainerRef;
  @ViewChild(DynamicFormComponent)
  private dynamicFormComponent?: DynamicFormComponent;

  get disableSaveButton(): boolean {
    console.log("DISABLE SAVE");
    const dynamicFormComponent = this.dynamicFormComponent;
    if (dynamicFormComponent instanceof DynamicFormComponent) {
      if (!dynamicFormComponent.valid) {
        return true;
      }

      const modelHasNotChanged = !dynamicFormComponent.modelHasChanged;
      const disableUntilChanged = this.ref.config._metadata.disableSaveButtonUntilModelChanged;
      if (modelHasNotChanged && disableUntilChanged) {
        return true;
      }
    }
    return false;
  }

  constructor(private readonly ref: DialogFormRef<FormSchema>, private readonly cd: ChangeDetectorRef) {
    this.form = this.ref.config.form;
    this.width = this.ref.config._metadata.width;
    this.headline = this.ref.config._metadata.headline;
    this.saveButtonText = this.ref.config._metadata.saveButtonText;
    this.cancelButtonText = this.ref.config._metadata.cancelButtonText;
    const modelChangeSub = this.form.modelChange$.subscribe(model => {
      console.log(model);

      console.log(model);
      console.log(model);
      console.log(model);
    });
  }

  ngAfterViewInit(): void {
    const messageSub = this.ref._internalMessages$.subscribe(res => {
      this.lastMessage = res;
      if (res.kind === "error-state") {
        this.width = "auto";
        this.maxWidth = "400px";
      }
      if (res.kind === "task-state") {
        this.width = "400px";
      }
      this.cd.detectChanges();
    });
    console.log(this.dynamicFormComponent);
    console.log(this.dynamicFormComponent);
    console.log(this.dynamicFormComponent);

    // const changeSub = this.form.
    this.subs.push(messageSub);
  }

  ngOnInit(): void {
    // console.log(this.ref.config);
  }

  onCancel() {
    this.ref.close();
  }

  activateSave() {
    return false;
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onSave() {
    const model = this.form.model;

    this.ref.save(model);
  }
}
