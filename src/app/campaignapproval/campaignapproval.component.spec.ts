import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignapprovalComponent } from './campaignapproval.component';

describe('CampaignapprovalComponent', () => {
  let component: CampaignapprovalComponent;
  let fixture: ComponentFixture<CampaignapprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignapprovalComponent]
    });
    fixture = TestBed.createComponent(CampaignapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
