import { TestBed } from '@angular/core/testing';

import { PicommService } from './picomm.service';

describe('PicommService', () => {
  let service: PicommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PicommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
