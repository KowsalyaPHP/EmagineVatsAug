import { TestBed } from '@angular/core/testing';

import { NothiredService } from './nothired.service';

describe('NothiredService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NothiredService = TestBed.get(NothiredService);
    expect(service).toBeTruthy();
  });
});
