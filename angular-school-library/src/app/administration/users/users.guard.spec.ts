import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthenticationFacade } from 'src/app/authentication/state/authentication.facade';
import { UsersGuard } from './users.guard';

describe('UsersGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        UsersGuard,
        provideMockStore({ }),
        AuthenticationFacade
      ]
    });
  });

  it('should ...', inject([UsersGuard], (guard: UsersGuard) => {
    expect(guard).toBeTruthy();
  }));
});
