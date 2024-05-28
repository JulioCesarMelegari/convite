import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { UsuarioLogin } from '../usuarioLogin';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenLogin } from '../tokenLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  usuario: UsuarioLogin;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.usuario = new UsuarioLogin();
    this.formLogin = this.formBuilder.group({
      login: [''],
      password: [''],
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.usuario.login = this.formLogin.value.login;
    this.usuario.password = this.formLogin.value.password;
    // console.log("usuario no submit:")
    //console.log(this.usuario)
    this.loginService.login(this.usuario)
      .subscribe({
        next: (response) => {
          console.log(response);
          var token = JSON.parse(JSON.stringify(response)).token;
          console.log("logado no sistema")
          localStorage.setItem("token", token);
          localStorage.setItem("usuario", this.usuario.login);
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
