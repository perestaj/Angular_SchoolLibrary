import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsersSearchPanelComponent } from './users-search-panel.component';

describe('UsersSearchPanelComponent', () => {
  let component: UsersSearchPanelComponent;
  let fixture: ComponentFixture<UsersSearchPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersSearchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
