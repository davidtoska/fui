import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Input,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { Form, FormImpl, FormModel, FormSchema } from "../../core/form";
import { ReplaySubject, Subscription } from "rxjs";
import { TextCtrlComponent } from "../../form-controls/text-ctrl/text-ctrl.component";
import { NumberCtrlComponent } from "../../form-controls/number-ctrl/number-ctrl.component";
import { TextAreaCtrlComponent } from "../../form-controls/textarea-ctrl/text-area-ctrl.component";
import { SelectCtrlComponent } from "../../form-controls/select-ctrl/select-ctrl.component";
import { SelectMultiCtrlComponent } from "../../form-controls/select-multi-ctrl/select-multi-ctrl.component";
import { FormGroup } from "@angular/forms";
import { BaseCtrl } from "../../form-controls/base.ctrl";
import { switchMap } from "rxjs/operators";
import { AnyField, NumberField, Select, SelectMulti, TextAreaField, TextField } from "../../core/metadata-builders";
import { V } from "../../utils";

const getComponent = (field: AnyField): Type<BaseCtrl<any>> => {
  if (field instanceof TextField) {
    return TextCtrlComponent;
  }

  if (field instanceof TextAreaField) {
    return TextAreaCtrlComponent;
  }
  if (field instanceof NumberField) {
    return NumberCtrlComponent;
  }
  if (field instanceof Select) {
    return SelectCtrlComponent;
  }

  if (field instanceof SelectMulti) {
    return SelectMultiCtrlComponent;
  }
  throw new Error("Could not find a component to given field-config");
};

@Component({
  selector: "fui-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements AfterViewInit, OnDestroy {
  private readonly configSubject = new ReplaySubject<FormImpl<FormSchema>>(1);
  private componentSubs: Subscription[] = [];
  private formSpecificSubs: Subscription[] = [];
  private fieldRefs: FieldCompoentRef[] = [];

  @ViewChild("formFields", { read: ViewContainerRef })
  public viewContainerRef!: ViewContainerRef;

  get valid() {
    return this.formGroup.status === "VALID";
  }

  modelHasChanged = false;

  private formImpl?: FormImpl<FormSchema>;

  formGroup = new FormGroup({});

  @Input()
  set formConfig(form: Form<FormSchema>) {
    if (form instanceof FormImpl) {
      this.clearForm();
      this.formImpl = form;
      this.configSubject.next(form);
    }
  }

  clearForm() {
    this.formSpecificSubs.forEach(item => {
      item.unsubscribe();
    });
    this.fieldRefs = [];
    this.modelHasChanged = false;
    if (this.viewContainerRef) {
      this.viewContainerRef.clear();
    }
  }

  constructor(private readonly cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const configSub = this.configSubject.subscribe(formConfig => {
      this.handleNewForm(formConfig);
    });

    const updateFormSubject = this.configSubject
      .pipe(switchMap(config => config.__updateFormSubject))
      .subscribe(res => {
        // TODO UPDATE FORM??
        console.log(res);
        console.log(res);
        console.log(res);
        console.log(res);
      });

    const valueChangesSub = this.formGroup.valueChanges.subscribe(() => {
      this.handleFormValueChanges();
    });
    this.componentSubs.push(configSub);
    this.componentSubs.push(valueChangesSub);
    this.componentSubs.push(updateFormSubject);
  }

  private handleFormValueChanges() {
    if (!this.formImpl) {
      return;
    }
    this.modelHasChanged = true;
    const isValid = this.formGroup.valid;
    const model: FormModel.OptionalTypeOf<any> = {};
    this.fieldRefs.forEach(field => {
      const key = field.key;
      const value = field.instance.getValue();
      model[key] = value;
    });
    // this.fieldRefs.forEach((el) => {
    //   if (el.disable) {
    //     el.disable(formGroupValue);
    //   }
    // });
    if (isValid) {
      const output = FormModel.valid(model);
      this.formImpl._emitModel(output);
    } else {
      this.formImpl._emitModel(FormModel.inValid(model));
    }
  }

  private handleNewForm(formConfig: FormImpl<FormSchema>) {
    if (!this.viewContainerRef) {
      return;
    }
    this.viewContainerRef.clear();
    const disableCallbacks = formConfig._getDisabledCallbacks();
    const fieldEntries = Object.entries(formConfig.fields);
    fieldEntries.forEach(([key, field]) => {
      const comp = getComponent(field);
      const componentRef = this.viewContainerRef.createComponent(comp);
      const instance = componentRef.instance;
      instance.field = field;
      const disable = disableCallbacks.get(key);
      this.formGroup.addControl(key, instance.formControl);
      this.fieldRefs.push({ key, componentRef, instance, disable });
    });

    // Set local modelChangeObservable
    formConfig.__updateFormSubject.subscribe(res => {
      if (!V.isRecord(res)) {
        return;
      }
      this.fieldRefs.forEach(ref => {
        if (ref.key in res) {
          const newValue = res[ref.key];
          ref.instance.setValue(newValue);
        }
      });
    });
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.clearForm();
  }
}

interface FieldCompoentRef {
  readonly key: string;
  readonly componentRef: ComponentRef<BaseCtrl<AnyField>>;
  readonly instance: BaseCtrl<AnyField>;
  readonly disable?: <T extends {}>(model: T) => boolean;
}
