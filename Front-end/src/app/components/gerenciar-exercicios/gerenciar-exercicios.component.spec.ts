import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarExerciciosComponent } from './gerenciar-exercicios.component';

describe('GerenciarExerciciosComponent', () => {
  let component: GerenciarExerciciosComponent;
  let fixture: ComponentFixture<GerenciarExerciciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarExerciciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarExerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
