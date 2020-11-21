import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppFacade } from 'src/app/state/app.facade';
import { PublishersFacade } from '../../state/publishers.facade';

import { PublishersListComponent } from './publishers-list.component';

describe('PublishersListComponent', () => {
  let component: PublishersListComponent;
  let fixture: ComponentFixture<PublishersListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ }),
        PublishersFacade,
        AppFacade
      ],
      declarations: [ PublishersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
