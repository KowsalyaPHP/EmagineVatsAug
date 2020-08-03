import { TestBed } from '@angular/core/testing';

import { ApplicationinfoService } from './applicationinfo.service';

describe('ApplicationinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationinfoService = TestBed.get(ApplicationinfoService);
    expect(service).toBeTruthy();
  });
});
