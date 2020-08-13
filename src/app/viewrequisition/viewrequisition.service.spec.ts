import { TestBed } from '@angular/core/testing';

import { ViewrequisitionService } from './viewrequisition.service';

describe('ViewrequisitionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewrequisitionService = TestBed.get(ViewrequisitionService);
    expect(service).toBeTruthy();
  });
});
