import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserDetailsFormComponent } from './user-details-form.component';

describe('UserDetailsFormComponent', () => {
  let component: UserDetailsFormComponent;
  let fixture: ComponentFixture<UserDetailsFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsFormComponent);
    component = fixture.componentInstance;
    component.user = {
      userID: 1,
      userName: '',
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: '',
      fullName: '',
      address: '',
      email: '',
      role: '',
      roleName: '',
      isDeleted: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
