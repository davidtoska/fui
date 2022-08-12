import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ColorCtrlComponent } from "./color-ctrl.component";

describe("NumberCtrlComponent", () => {
  let component: ColorCtrlComponent;
  let fixture: ComponentFixture<ColorCtrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorCtrlComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
