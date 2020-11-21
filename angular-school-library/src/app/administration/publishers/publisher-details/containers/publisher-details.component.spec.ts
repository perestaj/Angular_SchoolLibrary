import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { PublishersFacade } from '../../state/publishers.facade';

import { PublisherDetailsComponent } from './publisher-details.component';

describe('PublisherDetailsComponent', () => {
  let component: PublisherDetailsComponent;
  let fixture: ComponentFixture<PublisherDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherDetailsComponent ],
      imports: [RouterTestingModule],
      providers: [
        provideMockStore({ }),
        PublishersFacade
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
