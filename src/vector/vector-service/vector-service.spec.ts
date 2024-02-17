import { TestBed } from '@angular/core/testing';

import { VectorService } from './vector-service.service';

describe('VectorServiceService', () => {
  let service: VectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
