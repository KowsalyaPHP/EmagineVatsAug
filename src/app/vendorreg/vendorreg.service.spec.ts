import { TestBed } from '@angular/core/testing';

import { VendorregService } from './vendorreg.service';

describe('VendorregService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendorregService = TestBed.get(VendorregService);
    expect(service).toBeTruthy();
  });
});
