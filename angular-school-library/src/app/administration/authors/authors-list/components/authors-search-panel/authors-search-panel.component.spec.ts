import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthorsSearchPanelComponent } from './authors-search-panel.component';

describe('AuthorsSearchPanelComponent', () => {
  let component: AuthorsSearchPanelComponent;
  let fixture: ComponentFixture<AuthorsSearchPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ AuthorsSearchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsSearchPanelComponent);
    component = fixture.componentInstance;
    component.authorsSearchFilter = {
      fullName: '',
      additionalInformation: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
