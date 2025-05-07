import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VerificarVencimentoService {
  constructor() {}

  verificarVencimento(dataVencimento: Date): boolean {
    const hoje = new Date();
    const vencimento = new Date(dataVencimento);
    return vencimento >= hoje;
  }
}
