import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkownerComponent } from './networkowner.component';

describe('NetworkownerComponent', () => {
  let component: NetworkownerComponent;
  let fixture: ComponentFixture<NetworkownerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkownerComponent]
    });
    fixture = TestBed.createComponent(NetworkownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
