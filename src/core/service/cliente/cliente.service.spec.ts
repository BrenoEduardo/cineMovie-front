import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from './cliente.service';
import { RouterModule } from '@angular/router';

describe('ClienteService', () => {
  let service: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule.forRoot([])],
      providers: [ClienteService,]
    });
    service = TestBed.inject(ClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
