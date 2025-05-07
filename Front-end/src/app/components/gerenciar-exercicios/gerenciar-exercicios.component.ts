import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { SwalService } from '../../services/swal/swal.service';

@Component({
  selector: 'app-gerenciar-exercicios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-exercicios.component.html',
  styleUrl: './gerenciar-exercicios.component.css',
})
export class GerenciarExerciciosComponent {
  constructor(private http: HttpClient, private swal: SwalService) {}

  @Output() fechar = new EventEmitter<void>();

  fecharModel() {
    this.fechar.emit();
  }

  ngOnInit(): void {
    this.getExercicios();
  }

  getExercicios() {
    this.http
      .get('http://localhost:8080/api/exercicios')
      .subscribe((data: any) => {
        this.treinos = data;
      });
  }

  treinos: any[] = [];

  urlvideo: string = '';
  nome: string = '';

  removerTreino(id: string): void {
    this.http
      .delete(`http://localhost:8080/api/exercicios/${id}`, {
        responseType: 'text',
      })
      .subscribe({
        next: (res) => {
          this.swal.success(res);
          this.getExercicios();
        },
        error: (err: any) => {
          this.swal.error(err);
        },
      });
  }

  adicionarTreino() {
    if (!this.nome || !this.urlvideo) {
      this.swal.error('Nome e URL do vídeo são obrigatórios.');
      return;
    }

    const exercicio = {
      nome: this.nome.trim(),
      urlvideo: this.urlvideo.trim(),
    };

    this.http
      .post('http://localhost:8080/api/exercicios', exercicio, {
        responseType: 'text',
      })
      .subscribe({
        next: (res) => {
          this.swal.success('Exercício adicionado com sucesso! ' + res);
          this.nome = '';
          this.urlvideo = '';
          this.getExercicios();
        },
        error: (err) => {
          console.error(err);
          this.swal.error('Erro ao adicionar exercício');
        },
      });
  }
}
