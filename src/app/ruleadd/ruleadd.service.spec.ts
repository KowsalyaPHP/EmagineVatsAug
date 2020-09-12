import { TestBed } from '@angular/core/testing';

import { RuleaddService } from './ruleadd.service';

describe('RuleaddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RuleaddService = TestBed.get(RuleaddService);
    expect(service).toBeTruthy();
  });
});
