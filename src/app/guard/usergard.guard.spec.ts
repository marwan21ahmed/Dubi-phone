import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { usergardGuard } from './usergard.guard';

describe('usergardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => usergardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
