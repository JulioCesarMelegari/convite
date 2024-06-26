import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConviteComponent } from './convite/convite.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListaComponent } from './lista/lista.component';
import { RecebimentoComponent } from './recebimento/recebimento.component';
import { LikePipe } from './like.pipe';
import { EntregaComponent } from './entrega/entrega.component';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorModule } from './header-interceptor.service';
import { PrincipalComponent } from './principal/principal.component';
import { EventoComponent } from './evento/evento.component';
import { CardConviteComponent } from './card-convite/card-convite.component';
import { FinanceiroComponent } from './financeiro/financeiro.component';

@NgModule({
  declarations: [
    AppComponent,
    ConviteComponent,
    NavbarComponent,
    ListaComponent,
    RecebimentoComponent,
    LikePipe,
    EntregaComponent,
    LoginComponent,
    PrincipalComponent,
    EventoComponent,
    CardConviteComponent,
    FinanceiroComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    //HttpInterceptorModule,
    FormsModule 
  ],
  providers: [
    //{provide: LOCALE_ID, useValue: 'pt-br'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
