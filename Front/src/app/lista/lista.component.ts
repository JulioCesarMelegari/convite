import { Component, OnInit } from '@angular/core';
import { Convite } from '../convite';
import { Observable, of } from 'rxjs';
import { ConviteService } from '../convite.service';
import { Router } from '@angular/router';
import { Cadastro } from '../cadastro';
import { Evento } from '../evento';
import { EventoService } from '../evento.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {

  listConvites!: Observable<Convite[]>;
  listEvento!: Observable<Evento[]>;
  eventoNome: string='Todos';
  listaInicial: Convite[] = []

  constructor(private service: ConviteService, private eventoService: EventoService, private router: Router) {
    this.listEvento = this.eventoService.getEvento();
  }

  ngOnInit(): void {
    this.selecionarEvento();
  }

  getList() {
    this.listConvites = this.service.listarTodos();
  }

  getFormCadastrar() {
    this.router.navigate(['/cadastrar']);
  }

  async delete(id: number) {
    this.service.deletar(id).subscribe();
    this.router.navigate(['/home']);
  }

  selecionarEvento() {
    //console.log(this.eventoNome);
    if (this.eventoNome == 'Selecione...') {
      this.listConvites = of(this.listaInicial);
    } else {
      this.listConvites = this.service.listarConvitePorEvento(this.eventoNome);
      //console.log(this.listConvites);
    }
  }

}
