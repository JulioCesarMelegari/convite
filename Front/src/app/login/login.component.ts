import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { UsuarioLogin } from '../usuarioLogin';
import { Router } from '@angular/router';
import { TokenLogin } from '../tokenLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  usuario: UsuarioLogin;

  constructor(private loginService: LoginService, private router: Router) {
    this.usuario = new UsuarioLogin();
  }

  ngOnInit(): void {

  }

  onSubmit() {
      this.loginService.login(this.usuario)
      .subscribe({
        next: (response) => {
          console.log(response);
          var token = JSON.parse(JSON.stringify(response)).token;
          console.log("logado no sistema")
          localStorage.setItem("token", token);
          //localStorage.setItem("usuario", this.usuario.login);
          //console.info("token no localStorage: " + localStorage.getItem("token"));
          this.router.navigate(['principal']);
        },
        error: (e) => {
          console.error("Erro ao fazer login")
          alert('Acesso negado!')
        }
      });
  }

}
