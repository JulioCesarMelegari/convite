import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { ConviteComponent } from './convite/convite.component';
import { RecebimentoComponent } from './recebimento/recebimento.component';
import { EntregaComponent } from './entrega/entrega.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: '', component:LoginComponent},
  {path: 'principal', component:PrincipalComponent,
    children:[
      {path: 'home', component:ListaComponent},
      {path: 'cadastrar', component:ConviteComponent},
      {path: 'cadastrar/:id', component:ConviteComponent},
      {path: 'receber/:id', component:RecebimentoComponent},
      {path: 'entregar/:id', component:EntregaComponent},
      {path: 'login', component:LoginComponent},
      {path: '', component:LoginComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
