import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivecampaignsComponent } from './livecampaigns.component';

describe('LivecampaignsComponent', () => {
  let component: LivecampaignsComponent;
  let fixture: ComponentFixture<LivecampaignsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivecampaignsComponent]
    });
    fixture = TestBed.createComponent(LivecampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
