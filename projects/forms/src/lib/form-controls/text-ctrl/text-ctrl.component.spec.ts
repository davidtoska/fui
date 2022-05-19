import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextCtrlComponent } from './text-ctrl.component';

describe('TextCtrlComponent', () => {
  let component: TextCtrlComponent;
  let fixture: ComponentFixture<TextCtrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextCtrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
