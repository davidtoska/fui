import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CheckboxCtrlComponent } from "./checkbox-ctrl.component";

describe("NumberCtrlComponent", () => {
  let component: CheckboxCtrlComponent;
  let fixture: ComponentFixture<CheckboxCtrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckboxCtrlComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
