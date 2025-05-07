import { TestBed } from '@angular/core/testing';

import { VerificarVencimentoService } from './verificar-vencimento.service';

describe('VerificarVencimentoService', () => {
  let service: VerificarVencimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificarVencimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
