import { TestBed } from '@angular/core/testing';

import { ClientchildService } from './clientchild.service';

describe('ClientchildService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientchildService = TestBed.get(ClientchildService);
    expect(service).toBeTruthy();
  });
});
