import { TestBed } from '@angular/core/testing';

import { SubstageService } from './substage.service';

describe('SubstageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubstageService = TestBed.get(SubstageService);
    expect(service).toBeTruthy();
  });
});
