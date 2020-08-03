import { TestBed } from '@angular/core/testing';

import { RequisitionaddService } from './requisitionadd.service';

describe('RequisitionaddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequisitionaddService = TestBed.get(RequisitionaddService);
    expect(service).toBeTruthy();
  });
});
