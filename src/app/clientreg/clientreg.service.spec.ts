import { TestBed } from '@angular/core/testing';

import { ClientregService } from './clientreg.service';

describe('ClientregService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientregService = TestBed.get(ClientregService);
    expect(service).toBeTruthy();
  });
});
