import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SelectMultiCtrlComponent } from "./select-multi-ctrl.component";

describe("TextCtrlComponent", () => {
  let component: SelectMultiCtrlComponent;
  let fixture: ComponentFixture<SelectMultiCtrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectMultiCtrlComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMultiCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
