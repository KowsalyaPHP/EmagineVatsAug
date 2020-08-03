import { TestBed } from '@angular/core/testing';

import { ManageapplicationService } from './manageapplication.service';

describe('ManageapplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageapplicationService = TestBed.get(ManageapplicationService);
    expect(service).toBeTruthy();
  });
});
