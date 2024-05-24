import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConviteComponent } from './convite/convite.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListaComponent } from './lista/lista.component';
import { RecebimentoComponent } from './recebimento/recebimento.component';

@NgModule({
  declarations: [
    AppComponent,
    ConviteComponent,
    NavbarComponent,
    ListaComponent,
    RecebimentoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
