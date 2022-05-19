import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCtrlComponent } from './select-ctrl.component';

describe('TextCtrlComponent', () => {
  let component: SelectCtrlComponent;
  let fixture: ComponentFixture<SelectCtrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectCtrlComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
