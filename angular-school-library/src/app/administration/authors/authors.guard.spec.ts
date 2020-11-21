import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthenticationFacade } from 'src/app/authentication/state/authentication.facade';
import { AuthorsGuard } from './authors.guard';

describe('AuthorsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthorsGuard,
        provideMockStore({ }),
        AuthenticationFacade
      ]
    });
  });

  it('should ...', inject([AuthorsGuard], (guard: AuthorsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
