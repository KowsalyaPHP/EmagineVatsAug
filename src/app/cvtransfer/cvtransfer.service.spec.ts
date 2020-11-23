import { TestBed } from '@angular/core/testing';

import { CvtransferService } from './cvtransfer.service';

describe('CvtransferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CvtransferService = TestBed.get(CvtransferService);
    expect(service).toBeTruthy();
  });
});
