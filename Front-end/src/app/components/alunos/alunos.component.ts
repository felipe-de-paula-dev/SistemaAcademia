import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreinosComponent } from '../treinos/treinos.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CriarTreinoComponent } from '../criar-treino/criar-treino.component';
import { CriarTreinoAlunoComponent } from '../criar-treino-aluno/criar-treino-aluno.component';
import { SwalService } from '../../services/swal/swal.service';

@Component({
  selector: 'app-alunos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TreinosComponent,
    CriarTreinoComponent,
    CriarTreinoAlunoComponent,
  ],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.css',
})
export class AlunosComponent {
  constructor(private http: HttpClient, private swal: SwalService) {}

  @Input() usuario = '';
  @Output() fecharLogin = new EventEmitter<void>();
  alunoId: string = '';

  User: string = 'Aluno';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (this.usuario == 'aluno') this.User = 'Aluno';
      else this.User = 'Administrador';
    }
  }

  criarTreino: boolean = false;
  criarTreinoAlunoriarTreino: boolean = false;

  criarTreinoAluno() {
    this.criarTreino = true;
  }

  fecharCriarTreinoAluno() {
    this.criarTreino = false;
    this.getTreino().subscribe((data: any) => {
      this.Alunos = data;
    });
  }
  criarTreinoAlunoCpf(id: string) {
    this.criarTreinoAlunoriarTreino = true;
    this.alunoId = id;
  }

  fecharCriarTreinoAlunoCpf() {
    this.criarTreinoAlunoriarTreino = false;
    this.getTreino().subscribe((data: any) => {
      this.Alunos = data;
    });
  }

  Alunos: any[] = [];

  treinos: any = [];

  abrirTreinos(treino: any[]) {
    this.treinos = treino;
    this.fecharLogin.emit();
  }

  limparTreinos() {
    this.treinos = [];
  }

  private apiUrl = 'https://sistemaacademia.onrender.com/api/aluno';

  nome: string = '';

  getTreino(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getTreinoNome(nome: string): Observable<any> {
    return this.http.get(this.apiUrl + `/buscar?nome=${nome}`);
  }

  atualizarTreino(treino: any): void {
    this.http
      .put('https://sistemaacademia.onrender.com/api/treino', treino, {
        responseType: 'text',
      })
      .subscribe({
        next: (res) => {
          this.swal.success(res);
        },
        error: (err) => {
          this.swal.error(err);
        },
      });
  }

  ngOnInit(): void {
    this.getTreino().subscribe((data: any) => {
      this.Alunos = data;
    });
  }

  onNomeChange(event: any) {
    this.nome = event.target.value;
    if (this.nome == '') {
      this.getTreino().subscribe((data: any) => {
        this.Alunos = data;
      });
    } else {
      this.getTreinoNome(this.nome).subscribe((data: any) => {
        this.Alunos = data;
      });
    }
  }
}
