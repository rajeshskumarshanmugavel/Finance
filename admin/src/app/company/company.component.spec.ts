import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompnayComponent } from './company.component';

describe('CompnayComponent', () => {
  let component: CompnayComponent;
  let fixture: ComponentFixture<CompnayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompnayComponent]
    });
    fixture = TestBed.createComponent(CompnayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
