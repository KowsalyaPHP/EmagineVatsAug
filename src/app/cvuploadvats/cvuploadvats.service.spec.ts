import { TestBed } from '@angular/core/testing';

import { CvuploadvatsService } from './cvuploadvats.service';

describe('CvuploadvatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CvuploadvatsService = TestBed.get(CvuploadvatsService);
    expect(service).toBeTruthy();
  });
});
