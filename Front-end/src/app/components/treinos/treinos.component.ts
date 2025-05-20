import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditarTreinoComponent } from '../editar-treino/editar-treino.component';
import { VerificarVencimentoService } from '../../services/data/verificar-vencimento.service';
import { HttpClient } from '@angular/common/http';
import { SwalService } from '../../services/swal/swal.service';

@Component({
  selector: 'app-treinos',
  standalone: true,
  imports: [CommonModule, EditarTreinoComponent],
  templateUrl: './treinos.component.html',
  styleUrl: './treinos.component.css',
})
export class TreinosComponent {
  constructor(
    private VerificarVencimento: VerificarVencimentoService,
    private http: HttpClient,
    private swal: SwalService
  ) {}

  @Input() treinos: any[] = [];
  @Input() usuario: string = '';
  @Output() limpar = new EventEmitter<void>();
  @Output() atualizar = new EventEmitter<void>();

  private apiUrl = 'http://localhost:8080';

  treino: any = null;

  limparTreinos() {
    this.limpar.emit();
  }
  limparTreino() {
    this.treino = null;
  }

  async abrirTreino(treino: any) {
    if (this.usuario === 'aluno') {
      const confirmado = await this.swal.confirmarCpf(
        'Confirme que é você!',
        treino.cpfaluno
      );

      if (confirmado) {
        this.treino = treino;
      }

      return;
    }

    this.treino = treino;
  }

  dataVencimento(data: Date) {
    return this.VerificarVencimento.verificarVencimento(data);
  }

  async deletarTreino(id: string) {
    const response = await this.swal.confirmarComOTexto(
      'Você Tem Certeza?',
      'CONFIRMAR'
    );
    if (response) {
      this.http
        .delete(this.apiUrl + `/api/treino/${id}`, {
          responseType: 'text',
        })
        .subscribe({
          next: (res) => {
            this.swal.success(res);
            this.atualizar.emit();
            window.location.reload();
          },
          error: (err) => this.swal.error(err),
        });
    }
  }
}
