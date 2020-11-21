import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { PublisherEditFormComponent } from './publisher-edit-form.component';

describe('PublisherEditFormComponent', () => {
  let component: PublisherEditFormComponent;
  let fixture: ComponentFixture<PublisherEditFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ PublisherEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherEditFormComponent);
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
