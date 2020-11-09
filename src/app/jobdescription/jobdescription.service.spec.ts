import { TestBed } from '@angular/core/testing';

import { JobdescriptionService } from './jobdescription.service';

describe('JobdescriptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobdescriptionService = TestBed.get(JobdescriptionService);
    expect(service).toBeTruthy();
  });
});
