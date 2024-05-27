import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioLogin } from './usuarioLogin';
import { Observable } from 'rxjs';
import { UsuarioRegister } from './usuarioRegister';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public NewbaseUrl: string = 'http://localhost:8080/auth/'

  constructor(private http: HttpClient) {}


  login(usuarioLogin:UsuarioLogin):Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>(this.NewbaseUrl + 'login', usuarioLogin);
  }

  register(usuarioRegister:UsuarioRegister):Observable<UsuarioRegister>{
    return this.http.post<UsuarioRegister>(this.NewbaseUrl + 'register', usuarioRegister);
  }
}
