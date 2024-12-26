import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalconfigComponent } from './globalconfig.component';

describe('GlobalconfigComponent', () => {
  let component: GlobalconfigComponent;
  let fixture: ComponentFixture<GlobalconfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalconfigComponent]
    });
    fixture = TestBed.createComponent(GlobalconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
