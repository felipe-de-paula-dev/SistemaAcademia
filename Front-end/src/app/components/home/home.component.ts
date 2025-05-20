import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AlunosComponent } from '../alunos/alunos.component';
import { LoginComponent } from '../login/login/login.component';
import { Dumbbell, LucideAngularModule } from 'lucide-angular';
import { GerenciarExerciciosComponent } from '../gerenciar-exercicios/gerenciar-exercicios.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AlunosComponent,
    LoginComponent,
    LucideAngularModule,
    GerenciarExerciciosComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private http: HttpClient) {}

  readonly Peso = Dumbbell;

  loginUsuario = true;

  private apiUrl = 'http://localhost:8080';

  fecharloginUsuario() {
    this.loginUsuario = false;
  }

  token = sessionStorage.getItem('token');

  verificar(): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get<string>(
      this.apiUrl + '/auth/verificar',
      {
        responseType: 'text' as 'json',
        headers,
      }
    );
  }

  user: string | null = '';

  response: any;

  ngOnInit(): void {
    this.verificar().subscribe((data: any) => {
      if (data) this.usuario = 'Administrador';
    });

    this.user = sessionStorage.getItem('user');
  }

  usuario: string = 'aluno';

  sair() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    window.location.reload();
  }

  login = false;

  abrirLogin() {
    this.login = true;
  }

  fecharLogin() {
    this.login = false;
  }

  adicionarExercicio = false;

  addExercicio() {
    this.adicionarExercicio = true;
  }

  fechartAddExercicio() {
    this.adicionarExercicio = false;
  }
}
