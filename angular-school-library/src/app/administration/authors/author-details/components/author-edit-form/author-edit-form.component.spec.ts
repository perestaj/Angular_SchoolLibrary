import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthorEditFormComponent } from './author-edit-form.component';

describe('AuthorEditFormComponent', () => {
  let component: AuthorEditFormComponent;
  let fixture: ComponentFixture<AuthorEditFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ AuthorEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorEditFormComponent);
    component = fixture.componentInstance;
    component.author = {
      authorID: 1,
      firstName: '',
      lastName: '',
      fullName: '',
      additionalInformation: '',
      isDeleted: false
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
