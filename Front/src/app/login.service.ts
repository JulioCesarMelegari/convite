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

  nomeUsuarioLogin: string = 'Patativa do Assaré';
    

  constructor(private http: HttpClient, private router: Router) { }

  login(usuarioLogin: UsuarioLogin): Observable<any> {
    return this.http.post<any>(this.baseUrlLogin, usuarioLogin);
  }
  register(usuarioRegister: UsuarioRegister): Observable<UsuarioRegister> {
    return this.http.post<UsuarioRegister>(this.baseUrlRegister, usuarioRegister);
  }
  deslogar() {
    localStorage.clear();
    this.router.navigate(['home']);
  }
  get obterUsuarioLogado(): UsuarioLogin {
    const usuario = window.localStorage.getItem('usuario')
    return usuario ? JSON.parse(usuario) : [];
  }
  //obterTokenUsuario(): string {
  //  const token = window.localStorage.getItem('token')
  //  return token ? JSON.parse(token) : [];
//  }
  
 // entregarHeader() {
 //   const header: string = 'Bearer ' + this.obterTokenUsuario();
 ///  return { Authorization: header }
 // }
  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  adicionarHeader(){
      const tokensTRING = window.localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImpjbSIsImV4cCI6MTcxNzY4NTk1OX0.L6h_Z84XM6vpzKZaRLs7qDonGFUFM6aCbT0wazsotFM')
      const token = JSON.parse(tokensTRING || '{}');
      console.log(token);
      const header = {'Authorization' :  'Bearer ' + tokensTRING};
      return header;
  }
}
