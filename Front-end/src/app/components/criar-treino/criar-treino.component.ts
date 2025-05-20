import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { SwalService } from '../../services/swal/swal.service';

@Component({
  selector: 'app-criar-treino',
  imports: [FormsModule],
  templateUrl: './criar-treino.component.html',
  styleUrl: './criar-treino.component.css',
})
export class CriarTreinoComponent {
  constructor(private http: HttpClient, private swal: SwalService) {}

  @Output() fechar = new EventEmitter<void>();

  private apiUrl = 'https://sistemaacademia.onrender.com';

  Treino = {
    nomeAluno: '',
    nomeTreino: '',
    cpfAluno: '',
    qtdeDias: '',
    qtdeExercicios: '',
  };

  postTreino(): void {
    this.http
      .post(this.apiUrl + '/api/treino', this.Treino, {
        responseType: 'text',
      })
      .subscribe({
        next: (res) => {
          this.swal.success(res);
          this.fechar.emit();
        },
        error: (err) => {
          this.swal.error(err);
        },
      });
  }

  fecharModal() {
    this.fechar.emit();
  }

  criarTreino() {}
}
