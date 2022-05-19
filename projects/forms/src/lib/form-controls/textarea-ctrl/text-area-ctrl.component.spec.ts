import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaCtrlComponent } from './text-area-ctrl.component';

describe('TextCtrlComponent', () => {
  let component: TextAreaCtrlComponent;
  let fixture: ComponentFixture<TextAreaCtrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextAreaCtrlComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
