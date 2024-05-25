import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { ConviteComponent } from './convite/convite.component';
import { RecebimentoComponent } from './recebimento/recebimento.component';
import { EntregaComponent } from './entrega/entrega.component';

const routes: Routes = [
  {path: 'home', component:ListaComponent},
  {path: 'cadastrar', component:ConviteComponent},
  {path: 'cadastrar/:id', component:ConviteComponent},
  {path: 'receber/:id', component:RecebimentoComponent},
  {path: 'entregar/:id', component:EntregaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
