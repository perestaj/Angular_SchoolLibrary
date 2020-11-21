import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersSearchPanelComponent } from './users-search-panel.component';

describe('UsersSearchPanelComponent', () => {
  let component: UsersSearchPanelComponent;
  let fixture: ComponentFixture<UsersSearchPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [ UsersSearchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSearchPanelComponent);
    component = fixture.componentInstance;
    component.filter = {
      fullName: '',
      email: '',
      address: '',
      userRoles: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
