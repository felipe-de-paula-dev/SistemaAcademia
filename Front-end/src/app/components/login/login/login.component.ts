import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SwalService } from '../../../services/swal/swal.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private http: HttpClient, private alertService: SwalService) {}

  @Output() fecharLogin = new EventEmitter<void>();

  private apiUrl = 'https://sistemaacademia.onrender.com';

  loginData = {
    login: '',
    password: '',
  };

  login() {
    this.http
      .post(this.apiUrl + '/auth/login', this.loginData, {
        responseType: 'text',
      })
      .subscribe((data: any) => {
        sessionStorage.setItem('token', data);
        sessionStorage.setItem(
          'user',
          this.loginData.login.toString().charAt(0)
        );

        this.fecharLogin.emit();
        this.alertService.success('Login Bem Sucedido!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  }

  fechar() {
    this.fecharLogin.emit();
  }
}
