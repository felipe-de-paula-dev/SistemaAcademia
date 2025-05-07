import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SwalService } from '../../services/swal/swal.service';

@Component({
  selector: 'app-criar-treino-aluno',
  imports: [FormsModule],
  templateUrl: './criar-treino-aluno.component.html',
  styleUrl: './criar-treino-aluno.component.css',
})
export class CriarTreinoAlunoComponent {
  constructor(private http: HttpClient, private swal: SwalService) {}

  @Output() fechar = new EventEmitter<void>();

  @Input() alunoId!: string;

  Treino = {
    alunoId: '',
    nomeTreino: '',
    qtdeDias: '',
    qtdeExercicios: '',
  };

  postTreino(): void {
    this.Treino.alunoId = this.alunoId;
    this.http
      .post('http://localhost:8080/api/treino/cpf', this.Treino, {
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
}
