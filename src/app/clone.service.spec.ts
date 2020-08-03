import { TestBed } from '@angular/core/testing';

import { CloneService } from './clone.service';

describe('CloneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CloneService = TestBed.get(CloneService);
    expect(service).toBeTruthy();
  });
});
