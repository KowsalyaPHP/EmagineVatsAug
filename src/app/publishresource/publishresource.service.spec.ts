import { TestBed } from '@angular/core/testing';

import { PublishresourceService } from './publishresource.service';

describe('PublishresourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublishresourceService = TestBed.get(PublishresourceService);
    expect(service).toBeTruthy();
  });
});
