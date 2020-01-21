import { TestBed } from '@angular/core/testing';

import { StoringUserDataService } from './storing-user-data.service';

describe('StoringUserDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoringUserDataService = TestBed.get(StoringUserDataService);
    expect(service).toBeTruthy();
  });
});
