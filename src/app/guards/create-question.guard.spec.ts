import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { createQuestionGuard } from './create-question.guard';

describe('createQuestionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => createQuestionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
