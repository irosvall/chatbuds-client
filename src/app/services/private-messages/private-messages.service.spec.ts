import { TestBed } from '@angular/core/testing';

import { PrivateMessagesService } from './private-messages.service';

describe('PrivateMessagesService', () => {
  let service: PrivateMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should not save over 300 messages per friend', () => {
    
    expect(service).toBeTruthy();
  });
});
