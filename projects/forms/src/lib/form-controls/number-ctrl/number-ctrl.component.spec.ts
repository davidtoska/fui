import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NumberCtrlComponent } from "./number-ctrl.component";

describe("NumberCtrlComponent", () => {
  let component: NumberCtrlComponent;
  let fixture: ComponentFixture<NumberCtrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumberCtrlComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
