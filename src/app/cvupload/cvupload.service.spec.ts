import { TestBed } from '@angular/core/testing';

import { CvuploadService } from './cvupload.service';

describe('CvuploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CvuploadService = TestBed.get(CvuploadService);
    expect(service).toBeTruthy();
  });
});
