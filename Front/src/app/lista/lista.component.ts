import { Component, OnInit } from '@angular/core';
import { Convite } from '../convite';
import { Observable } from 'rxjs';
import { ConviteService } from '../convite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit{

  listConvites!: Observable<Convite[]>

  listarTodos:boolean=true;
  listarPendentes:boolean=false;
  listarPagos:boolean=false;
  listarNaoEntregues:boolean=false;
  listarEntregues:boolean=false;

  constructor(private service: ConviteService, private router: Router){  }


  ngOnInit(): void {
    if(this.listarTodos==true){
      this.listConvites = this.service.listarTodos();
    }
    if(this.listarPagos==true){
      this.listConvites = this.service.listarPagos();
    }
    if(this.listarPendentes==true){
      this.listConvites = this.service.listarPendentes();
    }
    if(this.listarNaoEntregues==true){
      this.listConvites = this.service.listarNaoEntregues();
    }
    if(this.listarPendentes==true){
      this.listConvites = this.service.listarPendentes();
    }
    if(this.listarEntregues==true){
      this.listConvites = this.service.listarEntregues();
    }
    if(this.listarNaoEntregues==true){
      this.listConvites = this.service.listarNaoEntregues();
    }
  }


  getFormCadastrar(){
    this.router.navigate(['/cadastrar'])
  }

  ListarPagos(){
    this.listarTodos=false;
    this.listarPendentes=false;
    this.listarPagos=true;
    this.listarNaoEntregues=false;
    this.listarEntregues=false;
  }

  ListarPendentes(){
    this.listarTodos=false;
    this.listarPendentes=true;
    this.listarPagos=false;
    this.listarNaoEntregues=false;
    this.listarEntregues=false;
  }

  ListarEntregues(){
    this.listarTodos=false;
    this.listarPendentes=false;
    this.listarPagos=false;
    this.listarNaoEntregues=false;
    this.listarEntregues=true;
  }

  ListarNaoEntregues(){
    this.listarTodos=false;
    this.listarPendentes=false;
    this.listarPagos=false;
    this.listarNaoEntregues=true;
    this.listarEntregues=false;
  }

}
