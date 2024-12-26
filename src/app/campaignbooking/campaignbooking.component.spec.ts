import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignbookingComponent } from './campaignbooking.component';

describe('CampaignbookingComponent', () => {
  let component: CampaignbookingComponent;
  let fixture: ComponentFixture<CampaignbookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignbookingComponent]
    });
    fixture = TestBed.createComponent(CampaignbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
