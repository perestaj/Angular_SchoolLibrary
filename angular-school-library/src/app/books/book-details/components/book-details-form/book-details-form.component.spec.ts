import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BookFacade } from 'src/app/books/state/book.facade';
import { BookStatuses } from 'src/app/shared/models/book-statuses';

import { BookDetailsFormComponent } from './book-details-form.component';

describe('BookDetailsFormComponent', () => {
  let component: BookDetailsFormComponent;
  let fixture: ComponentFixture<BookDetailsFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDetailsFormComponent ],
      providers: [BookFacade]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsFormComponent);
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
