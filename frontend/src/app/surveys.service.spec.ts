import { TestBed } from '@angular/core/testing';

import { SurveysService } from './articles/article-details/survey/surveys.service';

describe('SurveysService', () => {
  let service: SurveysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
