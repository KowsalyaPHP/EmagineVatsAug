import { TestBed } from '@angular/core/testing';

import { UserdashboardService } from './userdashboard.service';

describe('UserdashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserdashboardService = TestBed.get(UserdashboardService);
    expect(service).toBeTruthy();
  });
});
