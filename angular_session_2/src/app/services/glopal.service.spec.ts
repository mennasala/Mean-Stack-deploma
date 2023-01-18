import { TestBed } from '@angular/core/testing';

import { GlopalService } from './glopal.service';

describe('GlopalService', () => {
  let service: GlopalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlopalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
