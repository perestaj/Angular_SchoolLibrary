import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BookStatuses } from 'src/app/shared/models/book-statuses';

import { BookEditFormComponent } from './book-edit-form.component';

describe('BookEditFormComponent', () => {
  let component: BookEditFormComponent;
  let fixture: ComponentFixture<BookEditFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ BookEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditFormComponent);
    component = fixture.componentInstance;
    component.book = {
      bookID: 1,
      additionalInformation: '',
      title: '',
      publisherID: 1,
      status: BookStatuses.Available,
      statusName: '',
      authorIds: [1],
      isDeleted: false,
      authorsList: '',
      publisherName: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
