import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  private Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  success(message: string) {
    this.Toast.fire({
      icon: 'success',
      title: message,
    });
  }

  error(message: string) {
    this.Toast.fire({
      icon: 'error',
      title: message,
    });
  }

  warning(message: string) {
    this.Toast.fire({
      icon: 'warning',
      title: message,
    });
  }

  info(message: string) {
    this.Toast.fire({
      icon: 'info',
      title: message,
    });
  }

  confirmarComOTexto(title: string, confirmWord: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      input: 'text',
      icon: 'question',
      inputLabel: `Digite "${confirmWord}" para confirmar`,
      inputPlaceholder: confirmWord,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      preConfirm: (inputValue) => {
        if (inputValue !== confirmWord) {
          Swal.showValidationMessage('Palavra incorreta');
          return false;
        }
        return true;
      },
    }).then((result) => {
      return result.isConfirmed && result.value === confirmWord;
    });
  }

  confirmarCpf(title: string, confirmWord: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      input: 'text',
      icon: 'question',
      inputLabel: `Digite seu CPF para abrir`,
      inputPlaceholder: 'Seu Cpf',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      preConfirm: (inputValue) => {
        if (inputValue !== confirmWord) {
          this.error('CPF Invalido');
          return Promise.reject();
        }
        return true;
      },
    }).then((result) => result.isConfirmed);
  }
}
