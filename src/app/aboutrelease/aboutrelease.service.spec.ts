import { TestBed } from '@angular/core/testing';

import { AboutreleaseService } from './aboutrelease.service';

describe('AboutreleaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AboutreleaseService = TestBed.get(AboutreleaseService);
    expect(service).toBeTruthy();
  });
});
