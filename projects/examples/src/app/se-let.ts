import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { isObservable, Observable, Subscription } from "rxjs";

interface Context<T> {
  $implicit: T;
  seLet: T;
  count: number;
}

@Directive({
  selector: "[seLet]"
})
export class SeLetDirective<T> implements OnInit, OnDestroy {
  private context = { $implicit: undefined, seLet: undefined } as any as Context<T>;
  private sub?: Subscription;
  @Input("seLet") set seLet2(x: Observable<T>) {
    this.assign(x);
  }

  assign(value: Observable<T>) {
    // console.log("GETTING VALUE!! " + value);
    this.sub && this.sub.unsubscribe();
    if (isObservable(value)) {
      this.sub = value.subscribe(data => {
        this.cdr.markForCheck();
        const value = { name: "Context implicit", ...data };
        this.context.$implicit = value;
        this.context.seLet = value;
        this.context.count = 1;
      });
    } else {
    }
  }

  constructor(
    private templateRef: TemplateRef<Context<T>>,
    private viewContainer: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {
    this.assign = this.assign.bind(this);
  }

  ngOnInit() {
    this.viewContainer.createEmbeddedView(this.templateRef, this.context);
    // console.log(this.templateRef);
    // console.log(this.context);
  }

  static ngTemplateContextGuard<T>(dir: SeLetDirective<T>, ctx: unknown): ctx is Context<T> {
    return true;
  }

  ngOnDestroy() {
    this.sub && this.sub.unsubscribe();
  }
}
