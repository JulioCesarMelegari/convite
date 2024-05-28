import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioLogin } from './usuarioLogin';
import { Observable } from 'rxjs';
import { UsuarioRegister } from './usuarioRegister';
import { Router } from '@angular/router';
import { tap } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public baseUrlLogin: string = 'http://localhost:8080/auth/login'
  public baseUrlRegister: string = 'http://localhost:8080/auth/login/register'

  constructor(private http: HttpClient, private router:Router) {}

  login(usuarioLogin:UsuarioLogin):Observable<any>{
    return this.http.post<any>(this.baseUrlLogin, usuarioLogin);

  }

  register(usuarioRegister:UsuarioRegister):Observable<UsuarioRegister>{
    return this.http.post<UsuarioRegister>(this.baseUrlRegister, usuarioRegister);
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['login']);
}
get obterUsuarioLogado(): UsuarioLogin {

  const usuario = window.localStorage.getItem('usuario')
  return usuario ? JSON.parse(usuario) : [];
}

get obterTokenUsuario(): string {

  const token = window.localStorage.getItem('token')
  return token ? JSON.parse(token) : [];
}
get logado(): boolean {
  return localStorage.getItem('token') ? true : false;
}

}
