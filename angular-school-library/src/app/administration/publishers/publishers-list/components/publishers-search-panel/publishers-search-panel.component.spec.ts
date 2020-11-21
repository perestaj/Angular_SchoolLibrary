import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { PublishersSearchPanelComponent } from './publishers-search-panel.component';

describe('PublishersSearchPanelComponent', () => {
  let component: PublishersSearchPanelComponent;
  let fixture: ComponentFixture<PublishersSearchPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ PublishersSearchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishersSearchPanelComponent);
    component = fixture.componentInstance;
    component.publishersSearchFilter = {
      name: '',
      address: '',
      additionalInformation: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
