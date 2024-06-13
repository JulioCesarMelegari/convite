import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Convite } from '../convite';
import { ConviteService } from '../convite.service';
import { Evento } from '../evento';
import { EventoService } from '../evento.service';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.css']
})


export class FinanceiroComponent implements OnInit {

  

  eventoSelecionado!:string;
  checkboxPago: boolean = true;
  checkboxNaoPago: boolean = true;
  convitesSelecionados: Convite[] = [];
  listConvites!: Observable<Convite[]>;
  listEvento!: Observable<Evento[]>;
  eventoNome: string='Todos';
  quantidadeVendidos: number=0;
  totalConvites: number=0;
  totalPendente: number=0;
  totalVendidos: number=0;

  convPagos: number=0;
  convNaoPagos: number=0;
  totalRecebido: number=0;
  totalAreceber: number=0;

  constructor(private service: ConviteService, private eventoService: EventoService, private router: Router) {
    this.listEvento = this.eventoService.getEvento();
  }

  ngOnInit(): void {
    this.selecionarEvento();

  }

  selecionarEvento() {
    this.quantidadeVendidos=0;
    this.totalConvites=0;
    this.convPagos = 0;
    this.convNaoPagos = 0;
    this.totalRecebido = 0;
    this.totalAreceber = 0;
      this.listConvites = this.service.listarConvitePorEvento(this.eventoNome);
      this.listConvites.subscribe(response=>{
        this.quantidadeVendidos = this.getSumByKey(response, "quantidade");
        this.convPagos = this.getSumByCondition(response, "quantidade", true);
        this.convNaoPagos = this.getSumByCondition(response, "quantidade", false);
        this.totalRecebido = this.getTotalValue(response, true);
        this.totalAreceber = this.getTotalValue(response, false);
      });
      this.getTotalConvites(this.eventoNome);
      this.getNomeEvento(this.eventoNome);
  }

  getSumByKey(arr: Convite[], key: keyof Convite): number {
    return arr.reduce((sum, item) => sum + (item[key] as number || 0), 0);
  }

  getSumByCondition(arr: Convite[], key: keyof Convite, condition: boolean): number {
    return arr
      .filter(item => item.pago === condition)
      .reduce((sum, item) => sum + (item[key] as number || 0), 0);
  }
  
  getTotalValue(arr: Convite[], pago: boolean): number {
    return arr
      .filter(convite => convite.pago === pago)
      .reduce((total, convite) => total + (convite.valorUnitario * convite.quantidade), 0);
  }

  getTotalConvites(nomelista: string){
     this.eventoService.getEventoPorNome(nomelista).subscribe(response =>{
      this.totalConvites = response.totalConvites;
     });
  }

  getNomeEvento(nomelista: string){
    this.eventoService.getEventoPorNome(nomelista).subscribe(response =>{
     this.eventoSelecionado = response.nomeEvento;
    });
 }

 loadConvitesPagos(): void {
  this.service.listarConvitePorEvento(this.eventoNome).subscribe(
    (convites: Convite[]) => {
      this.convitesSelecionados = convites.filter(convite => {
        if (this.checkboxPago && this.checkboxNaoPago) {
          return true;
        }
        if (this.checkboxPago) {
          return convite.pago === true;
        }
        if (this.checkboxNaoPago) {
          return convite.pago === false;
        }
        return false;
      });
      this.listConvites = new Observable(observer => observer.next(this.convitesSelecionados));
    },
    (error: any) => console.error('Erro ao carregar convites', error)
  );
}

}