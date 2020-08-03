import { TestBed } from '@angular/core/testing';

import { ReqcvlogsService } from './reqcvlogs.service';

describe('ReqcvlogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReqcvlogsService = TestBed.get(ReqcvlogsService);
    expect(service).toBeTruthy();
  });
});
