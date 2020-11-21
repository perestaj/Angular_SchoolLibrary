import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PublisherDetailsFormComponent } from './publisher-details-form.component';

describe('PublisherDetailsFormComponent', () => {
  let component: PublisherDetailsFormComponent;
  let fixture: ComponentFixture<PublisherDetailsFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherDetailsFormComponent);
    component = fixture.componentInstance;
    component.publisher = {
      publisherID: 1,
      name: '',
      address: '',
      additionalInformation: '',
      isDeleted: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
