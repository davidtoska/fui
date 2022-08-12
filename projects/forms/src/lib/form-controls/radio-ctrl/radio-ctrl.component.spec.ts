import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RadioCtrlComponent } from "./radio-ctrl.component";

describe("TextCtrlComponent", () => {
  let component: RadioCtrlComponent;
  let fixture: ComponentFixture<RadioCtrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadioCtrlComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
