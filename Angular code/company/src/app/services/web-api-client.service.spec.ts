import { TestBed, inject } from '@angular/core/testing';

import { WebApiClientService } from './web-api-client.service';

describe('WebApiClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebApiClientService]
    });
  });

  it('should be created', inject([WebApiClientService], (service: WebApiClientService) => {
    expect(service).toBeTruthy();
  }));
});
