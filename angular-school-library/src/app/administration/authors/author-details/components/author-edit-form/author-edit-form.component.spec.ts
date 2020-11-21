import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AuthorEditFormComponent } from './author-edit-form.component';

describe('AuthorEditFormComponent', () => {
  let component: AuthorEditFormComponent;
  let fixture: ComponentFixture<AuthorEditFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
