import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { PublishersService } from './publishers.service';

describe('PublishersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PublishersService]
    });
  });

  it('should be created', inject([PublishersService], (service: PublishersService) => {
    expect(service).toBeTruthy();
  }));
});
