import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { AuthorsService } from './authors.service';

describe('AuthorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [AuthorsService]
    });
  });

  it('should be created', inject([AuthorsService], (service: AuthorsService) => {
    expect(service).toBeTruthy();
  }));
});
