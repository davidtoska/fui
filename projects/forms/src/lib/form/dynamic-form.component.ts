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
import { Form, FormImpl, FormSchema } from "../core/form";
import { BehaviorSubject, ReplaySubject, Subscription } from "rxjs";
import { TextCtrlComponent } from "../form-controls/text-ctrl/text-ctrl.component";
import { NumberCtrlComponent } from "../form-controls/number-ctrl/number-ctrl.component";
import { TextAreaCtrlComponent } from "../form-controls/textarea-ctrl/text-area-ctrl.component";
import { SelectCtrlComponent } from "../form-controls/select-ctrl/select-ctrl.component";
import { SelectMultiCtrlComponent } from "../form-controls/select-multi-ctrl/select-multi-ctrl.component";
import { FormGroup } from "@angular/forms";
import { BaseCtrl } from "../form-controls/base.ctrl";
import {
  CheckboxField,
  ColorField,
  FieldBuilderBase,
  NumberField,
  Select,
  RadioField,
  SelectMulti,
  TextAreaField,
  TextField,
  SlideToggleField
} from "../core/field.builders";
import { Utils } from "../util/utils";
import { Model } from "../core/model";
import { FieldConfigBase } from "../core/field";
import { CheckboxCtrlComponent } from "../form-controls/checkbox-ctrl/checkbox-ctrl.component";
import { ColorCtrlComponent } from "../form-controls/color-ctrl/color-ctrl.component";
import { RadioCtrlComponent } from "../form-controls/radio-ctrl/radio-ctrl.component";
import { SlideToggleCtrlComponent } from "../form-controls/slide-toggle-ctrl/slide-toggle-ctrl.component";

const getComponentOrThrow = (
  field: FieldBuilderBase<any>
): Type<BaseCtrl<FieldConfigBase<any>>> => {
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
  if (field instanceof CheckboxField) {
    return CheckboxCtrlComponent;
  }
  if (field instanceof ColorField) {
    return ColorCtrlComponent;
  }
  if (field instanceof RadioField) {
    return RadioCtrlComponent;
  }
  if (field instanceof SlideToggleField) {
    return SlideToggleCtrlComponent;
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
  private readonly TAG = "[DYNAMIC_FORM_COMPONENT]";
  private readonly configSubject = new ReplaySubject<FormImpl<FormSchema>>(1);
  private subs: Subscription[] = [];
  private formInstanceSubs: Subscription[] = [];
  private fieldRefs: FieldComponentRef[] = [];
  currentDebugModel: Record<string, any> = {};
  showDebugger = false;

  @ViewChild("formFields", { read: ViewContainerRef, static: true })
  public viewContainerRef!: ViewContainerRef;

  valid = true;
  modelHasChanged = false;

  formImpl?: FormImpl<FormSchema>;

  private formGroup = new FormGroup({});

  @Input()
  set formConfig(form: Form<FormSchema>) {
    if (form instanceof FormImpl) {
      this.clearForm();
      this.formImpl = form;
      this.showDebugger = form.showDebugger;
      this.configSubject.next(form);
    }
  }

  clearForm() {
    this.formInstanceSubs.forEach(item => {
      item.unsubscribe();
    });
    this.fieldRefs = [];
    this.showDebugger = false;
    this.modelHasChanged = false;
    if (this.viewContainerRef) {
      this.viewContainerRef.clear();
    }
  }

  constructor(private readonly cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.subs.push(
      this.configSubject.subscribe(formConfig => {
        this.handleNewForm(formConfig);
      })
    );

    this.subs.push(
      this.formGroup.valueChanges.subscribe(() => {
        this.handleFormValueChanges();
      })
    );

    setTimeout(() => {
      this.valid = this.formGroup.valid;
    }, 10);
  }

  private getCurrentModel(): Model.TypeOfOptional<any> {
    const model: Model.TypeOfOptional<any> = {};

    return model;
  }

  private getCurrentModel2(): Model.Valid<any> | Model.InValid<any> {
    const model: Model.TypeOfOptional<any> = {};
    this.fieldRefs.forEach(field => {
      const key = field.key;
      // console.log(key + " [valid]: " + field.instance.formControl.valid);
      const value = field.instance.getValue();
      model[key] = value;
    });
    // const model = this.getCurrentModel();
    // TODO ADD VALIDATION TO COMPONENTS
    const isValid = this.formGroup.valid;
    if (isValid) {
      return Model.valid(model);
    } else {
      return Model.inValid(model);
    }
  }

  private handleFormValueChanges() {
    if (!this.formImpl) {
      return;
    }
    console.log("HANDEL FORM CHANGES");
    this.modelHasChanged = true;

    // TODO DONT RELY ON FORMGROUP VALIDATION!!
    const isValid = this.formGroup.valid;
    const model = this.getCurrentModel();
    this.checkDisableFields();
    if (isValid) {
      this.formImpl._emitModel(Model.valid(model));
    } else {
      this.formImpl._emitModel(Model.inValid(model));
    }
    this.valid = isValid;
    this.currentDebugModel = this.getCurrentModel2();
    this.cd.detectChanges();
  }

  private handleNewForm(formConfig: FormImpl<FormSchema>) {
    if (!this.viewContainerRef) {
      return;
    }

    // Clear subscriptions from last formInstance
    this.formInstanceSubs.forEach(sub => {
      sub.unsubscribe();
    });
    this.formInstanceSubs = [];
    this.viewContainerRef.clear();
    const disableCallbacks = formConfig._getDisabledCallbacks();
    const fieldEntries = Object.entries(formConfig.fields);

    fieldEntries.forEach(([key, field]) => {
      const comp = getComponentOrThrow(field);
      const componentRef = this.viewContainerRef.createComponent(comp);
      const instance = componentRef.instance;
      instance.fieldConfig = field.__config;
      const disable = disableCallbacks[key];
      this.formGroup.addControl(key, instance.formControl);
      this.fieldRefs.push({ key, componentRef, instance, disable });
    });
    this.checkDisableFields();

    // Set local modelChangeObservable
    const updateFormSubscription = formConfig.__updateFormSubject.subscribe(
      res => {
        if (!Utils.isRecord(res)) {
          return;
        }
        this.fieldRefs.forEach(ref => {
          if (ref.key in res) {
            const newValue = res[ref.key];
            ref.instance.setValue(newValue);
          }
        });
        this.cd.detectChanges();
      }
    );
    this.formInstanceSubs.push(updateFormSubscription);
    this.currentDebugModel = this.getCurrentModel2();
    this.cd.detectChanges();
  }

  private checkDisableFields() {
    const model = this.getCurrentModel();
    this.fieldRefs.forEach(field => {
      const fn = field.disable;
      if (typeof fn === "function") {
        console.group(field.key);
        fn(model);
        const disableField = fn(model);
        if (typeof disableField === "boolean") {
          field.instance.disabled = disableField;
          field.componentRef.changeDetectorRef.detectChanges();
        }
        console.groupEnd();
      }
    });
  }

  ngOnDestroy(): void {
    this.clearForm();
  }
}

interface FieldComponentRef {
  readonly key: string;
  readonly componentRef: ComponentRef<BaseCtrl<FieldConfigBase<any>>>;
  readonly instance: BaseCtrl<FieldConfigBase<any>>;
  readonly disable?: <T extends {}>(model: T) => boolean;
}
