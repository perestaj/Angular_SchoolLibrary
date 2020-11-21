import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AuthorDetailsFormComponent } from './author-details-form.component';

describe('AuthorDetailsFormComponent', () => {
  let component: AuthorDetailsFormComponent;
  let fixture: ComponentFixture<AuthorDetailsFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
