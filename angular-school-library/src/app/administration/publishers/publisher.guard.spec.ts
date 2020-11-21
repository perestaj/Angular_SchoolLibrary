import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthenticationFacade } from 'src/app/authentication/state/authentication.facade';
import { PublisherGuard } from './publisher.guard';
import { PublishersFacade } from './state/publishers.facade';

describe('PublisherGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        PublisherGuard,
        provideMockStore({ }),
        AuthenticationFacade,
        PublishersFacade
      ]
    });
  });

  it('should ...', inject([PublisherGuard], (guard: PublisherGuard) => {
    expect(guard).toBeTruthy();
  }));
});
