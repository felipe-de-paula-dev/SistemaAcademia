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
}
