import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { LoansSearchPanelComponent } from './loans-search-panel.component';

describe('LoansSearchPanelComponent', () => {
  let component: LoansSearchPanelComponent;
  let fixture: ComponentFixture<LoansSearchPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ LoansSearchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansSearchPanelComponent);
    component = fixture.componentInstance;
    component.filter = {
      title: '',
      user: '',
      bookStatuses: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
