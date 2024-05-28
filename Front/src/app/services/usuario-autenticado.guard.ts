import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticadoGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router) { }
  canActivate(){
    if (this.loginService.logado) {
      console.log("guard usuario-autenticado(true): usuario logado")
      return true;
    }
    this.router.navigate(['login']);
    console.log("guard usuario-autenticado(false): usuario nao logado")
    return false;
  }
  
}
