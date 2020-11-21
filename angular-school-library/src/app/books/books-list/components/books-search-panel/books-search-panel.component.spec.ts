import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BooksSearchPanelComponent } from './books-search-panel.component';

describe('BooksSearchPanelComponent', () => {
  let component: BooksSearchPanelComponent;
  let fixture: ComponentFixture<BooksSearchPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksSearchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
