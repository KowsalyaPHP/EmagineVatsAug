import { TestBed } from '@angular/core/testing';

import { AddskillService } from './addskill.service';

describe('AddskillService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddskillService = TestBed.get(AddskillService);
    expect(service).toBeTruthy();
  });
});
