import { TestBed, inject } from '@angular/core/testing';

import { DataCreatorService } from './data-creator.service';

describe('DataCreatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataCreatorService]
    });
  });

  it('should be created', inject([DataCreatorService], (service: DataCreatorService) => {
    expect(service).toBeTruthy();
  }));
});
