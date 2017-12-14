import { TestBed, inject } from '@angular/core/testing';

import { SearchingService } from './searching.service';

describe('SearchingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchingService]
    });
  });

  it('should be created', inject([SearchingService], (service: SearchingService) => {
    expect(service).toBeTruthy();
  }));
});
