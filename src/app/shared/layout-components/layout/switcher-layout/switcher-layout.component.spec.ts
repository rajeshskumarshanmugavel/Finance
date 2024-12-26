import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitcherLayoutComponent } from './switcher-layout.component';

describe('SwitcherLayoutComponent', () => {
  let component: SwitcherLayoutComponent;
  let fixture: ComponentFixture<SwitcherLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwitcherLayoutComponent]
    });
    fixture = TestBed.createComponent(SwitcherLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
