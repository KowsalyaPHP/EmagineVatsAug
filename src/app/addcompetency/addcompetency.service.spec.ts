import { TestBed } from '@angular/core/testing';

import { AddcompetencyService } from './addcompetency.service';

describe('AddcompetencyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddcompetencyService = TestBed.get(AddcompetencyService);
    expect(service).toBeTruthy();
  });
});
