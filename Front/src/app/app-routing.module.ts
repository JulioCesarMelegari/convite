import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { ConviteComponent } from './convite/convite.component';
import { RecebimentoComponent } from './recebimento/recebimento.component';
import { EntregaComponent } from './entrega/entrega.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { UsuarioNaoAutenticadoGuard } from './services/usuario-nao-autenticado.guard';
import { UsuarioAutenticadoGuard } from './services/usuario-autenticado.guard';
import { EventoComponent } from './evento/evento.component';

const routes: Routes = [
 // {path: 'login', component:LoginComponent, /*canActivate: [UsuarioNaoAutenticadoGuard]*/},
 // {path: '', component:LoginComponent, /*canActivate: [UsuarioNaoAutenticadoGuard]*/},
  {path: 'principal', component:PrincipalComponent, /*canActivate: [UsuarioAutenticadoGuard]*/},
  {path: 'home', component:ListaComponent},
  {path: 'cadastrar', component:ConviteComponent},
  {path: 'cadastrar/:id', component:ConviteComponent},
  {path: 'receber/:id', component:RecebimentoComponent},
  {path: 'entregar/:id', component:EntregaComponent},
  {path: 'evento', component:EventoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
