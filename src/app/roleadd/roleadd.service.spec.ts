import { TestBed } from '@angular/core/testing';

import { RoleaddService } from './roleadd.service';

describe('RoleaddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleaddService = TestBed.get(RoleaddService);
    expect(service).toBeTruthy();
  });
});
