import { ReplaySubject, Subscription } from "rxjs";
import { OverlayRef } from "@angular/cdk/overlay";
import { FormSchema } from "../core/form";
import { DialogFormImpl } from "./dialog-form";

type ModelCallback<T> = (model: T) => void;

export type DialogMessage =
  | { readonly kind: "show-form" }
  | { readonly kind: "error-state"; readonly message: string }
  | { readonly kind: "task-state"; readonly message: string };

export class DialogFormRef<T extends FormSchema> {
  private onSaveCallback = new Set<ModelCallback<{ [P in keyof T]: T[P]["__config"]["__output"] }>>();

  private readonly internalMessageSubject = new ReplaySubject<DialogMessage>(1);
  readonly _internalMessages$ = this.internalMessageSubject.asObservable();
  private subs: Subscription[] = [];

  constructor(private overlay: OverlayRef, public config: DialogFormImpl<T>) {
    const sub = this.overlay.backdropClick().subscribe(() => {
      this.close();
    });
    this.subs.push(sub);
  }
  /**
   * Close and clean up dialog-form.
   */
  close() {
    // TODO clean up
    this.internalMessageSubject.complete();
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
    this.overlay.dispose();
    // this._close();
  }

  /**
   * Set error state on dialog-form with message!!
   */
  setError(message: string) {
    this.internalMessageSubject.next({ kind: "error-state", message });
  }

  /**
   * Set loading state on module
   * @param message
   */
  setLoading(message: string) {
    this.internalMessageSubject.next({ kind: "task-state", message });
  }

  /**
   * Emits the current model to dialog-form-ref.
   * @param model
   */
  save(model: { [P in keyof T]: T[P]["__config"]["__output"] }) {
    this.onSaveCallback.forEach(cb => {
      cb(model);
    });
  }

  onSaveButtonClicked(cb: ModelCallback<{ [P in keyof T]: T[P]["__config"]["__output"] }>) {
    this.onSaveCallback.add(cb);
    return this;
  }
}
