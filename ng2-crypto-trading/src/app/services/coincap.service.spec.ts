import { TestBed, inject } from '@angular/core/testing';

import { CoincapService } from './coincap.service';

describe('CoincapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoincapService]
    });
  });

  it('should be created', inject([CoincapService], (service: CoincapService) => {
    expect(service).toBeTruthy();
  }));
});
