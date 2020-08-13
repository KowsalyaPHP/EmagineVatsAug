import { TestBed } from '@angular/core/testing';

import { PrescreeningquestionService } from './prescreeningquestion.service';

describe('PrescreeningquestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrescreeningquestionService = TestBed.get(PrescreeningquestionService);
    expect(service).toBeTruthy();
  });
});
