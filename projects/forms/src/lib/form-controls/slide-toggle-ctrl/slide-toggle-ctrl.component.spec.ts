import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SlideToggleCtrlComponent } from "./slide-toggle-ctrl.component";

describe("NumberCtrlComponent", () => {
  let component: SlideToggleCtrlComponent;
  let fixture: ComponentFixture<SlideToggleCtrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlideToggleCtrlComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideToggleCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
