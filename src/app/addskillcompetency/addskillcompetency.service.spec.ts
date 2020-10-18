import { TestBed } from '@angular/core/testing';

import { AddskillcompetencyService } from './addskillcompetency.service';

describe('AddskillcompetencyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddskillcompetencyService = TestBed.get(AddskillcompetencyService);
    expect(service).toBeTruthy();
  });
});
