import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-exercicio',
  imports: [FormsModule, CommonModule],
  templateUrl: './exercicio.component.html',
  styleUrl: './exercicio.component.css',
})
export class ExercicioComponent {
  constructor(private http: HttpClient) {}

  @Output() fechar = new EventEmitter<void>();
  @Output() nomeExercicioChange = new EventEmitter<string>();

  exercicios: any[] = [];

  filtro: string = '';

  exercicioSalvo: any;

  ngOnInit(): void {
    this.http
      .get('http://localhost:8080/api/exercicios')
      .subscribe((data: any) => {
        this.exercicios = data;
      });
  }

  fecharModel() {
    this.fechar.emit();
  }

  salvar() {
    this.nomeExercicioChange.emit(this.exercicioSalvo);
    this.fechar.emit();
  }

  onInputChange(event: any) {
    if (this.filtro != '') {
      this.http
        .get(`http://localhost:8080/api/exercicios/${this.filtro}`)
        .subscribe((data: any) => {
          this.exercicios = data;
        });
    } else {
      this.http
        .get('http://localhost:8080/api/exercicios')
        .subscribe((data: any) => {
          this.exercicios = data;
        });
    }
  }
}
