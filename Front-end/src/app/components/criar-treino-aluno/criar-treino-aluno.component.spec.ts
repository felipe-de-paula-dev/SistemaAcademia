import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarTreinoAlunoComponent } from './criar-treino-aluno.component';

describe('CriarTreinoAlunoComponent', () => {
  let component: CriarTreinoAlunoComponent;
  let fixture: ComponentFixture<CriarTreinoAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarTreinoAlunoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarTreinoAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
