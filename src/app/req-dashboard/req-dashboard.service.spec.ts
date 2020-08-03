import { TestBed } from '@angular/core/testing';

import { ReqDashboardService } from './req-dashboard.service';

describe('ReqDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReqDashboardService = TestBed.get(ReqDashboardService);
    expect(service).toBeTruthy();
  });
});
