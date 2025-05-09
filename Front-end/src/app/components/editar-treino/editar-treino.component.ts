import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExercicioComponent } from '../exercicio/exercicio/exercicio.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SwalService } from '../../services/swal/swal.service';

@Component({
  selector: 'app-editar-treino',
  standalone: true,
  imports: [CommonModule, FormsModule, ExercicioComponent],
  templateUrl: './editar-treino.component.html',
  styleUrls: ['./editar-treino.component.css'],
})
export class EditarTreinoComponent {
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private swal: SwalService
  ) {}

  @Input() treino: any;
  @Input() usuario: string = '';
  @Input() nomeExercicio: string = '';
  @Output() limpar = new EventEmitter<void>();

  exercicioMudar = false;

  editarExercicio(diaTreinoMudar: number, i: number) {
    this.diaTreinoMudar = diaTreinoMudar;
    this.casaExercicio = i;
    this.exercicioMudar = true;
  }

  fecharEditarExercicio() {
    if (this.nomeExercicio === '' || this.nomeExercicio === undefined) {
      this.exercicioMudar = false;
      return;
    } else {
      this.treino.diaTreinos[this.diaTreinoMudar].exercicios[
        this.casaExercicio
      ] = this.nomeExercicio;
    }
    this.exercicioMudar = false;
  }

  diaTreinoMudar = 0;
  modificar = false;
  diaTreino = 0;
  casaExercicio = 0;
  mudarDia = true;

  diasSemana: string[] = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ];

  mudarDiaTrue() {
    this.mudarDia = true;
  }

  selecionarDia(dia: number) {
    this.diaTreino = dia;
    this.mudarDia = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuario']) {
      this.modificar = this.usuario === 'Administrador';
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  limparTreino() {
    this.limpar.emit();
  }

  atualizarTreino() {
    this.http
      .put('https://sistemaacademia.onrender.com/api/treino', this.treino, {
        responseType: 'text',
      })
      .subscribe({
        next: (res) => this.swal.success(res),
        error: (err) => this.swal.error(err),
      });
  }

  showModal = false;
  urlVideo = '';
  safeUrl: SafeResourceUrl = '';

  voltar() {
    this.showModal = false;
  }

  exercicioNome = '';

  abrirUrl(nome: string) {
    this.http
      .get(`https://sistemaacademia.onrender.com/api/exercicios/${nome}`)
      .subscribe((res: any) => {
        const url = typeof res === 'string' ? res[0] : res[0]?.urlvideo;

        if (!url) {
          console.warn('URL do vídeo não encontrada para o exercício:', nome);
          return;
        }

        this.exercicioNome = nome;

        const embed = this.gerarEmbedUrl(url);
        if (embed) {
          this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embed);
          this.showModal = true;
        }
      });
  }

  private gerarEmbedUrl(url: string): string | null {
    const idMatch = url.match(/(?:v=|\.be\/)([a-zA-Z0-9_-]{11})/);
    const tMatch = url.match(/[?&]t=(\d+)/);

    if (!idMatch) return null;

    const videoId = idMatch[1];
    const startTime = tMatch ? `?start=${tMatch[1]}` : '';

    return `https://www.youtube.com/embed/${videoId}${startTime}&autoplay=1&mute=1`;
  }
}
