import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PublishersSearchPanelComponent } from './publishers-search-panel.component';

describe('PublishersSearchPanelComponent', () => {
  let component: PublishersSearchPanelComponent;
  let fixture: ComponentFixture<PublishersSearchPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishersSearchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishersSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
