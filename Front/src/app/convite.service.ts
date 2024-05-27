import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Convite } from './convite';
import { Observable } from 'rxjs';
import { Cadastro } from './cadastro';
import { FormRecebimento } from './formRecebimento';
import { FormEntrega } from './formEntrega';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class ConviteService {

  public NewbaseUrl: string = 'http://localhost:8080/convites/'

  usuario: Usuario;

  constructor(private httpClient: HttpClient) {
    this.usuario = new Usuario();
    this.usuario.name= 'Renato Aragão'
    this.usuario.login = 'Didi';
    this.usuario.password = '123';
   }

  salvarConvite(formConvite:Cadastro):Observable<Cadastro>{
    return this.httpClient.post<Cadastro>(this.NewbaseUrl + 'cadastrar', formConvite);
  }

  getConviteById(id:any):Observable<Convite>{
    return this.httpClient.get<Convite>(this.NewbaseUrl+`${id}`);
  }

  updateCadastrar(id:number, formConvite:Cadastro):Observable<Cadastro>{
    return this.httpClient.put<Cadastro>(this.NewbaseUrl+'cadastrar/'+`${id}`, formConvite);
  }

  pagar(id:number, formPagamento:FormRecebimento):Observable<FormRecebimento>{
    return this.httpClient.put<FormRecebimento>(this.NewbaseUrl+'pagar/'+`${id}`, formPagamento);
  }

  entregar(id:number, formEntrega:FormEntrega):Observable<FormEntrega>{
    return this.httpClient.put<FormEntrega>(this.NewbaseUrl+'entregar/'+`${id}`, formEntrega);
  }

  deletar(id:any){
    return this.httpClient.delete(this.NewbaseUrl+`${id}`);
  }

  listarTodos():Observable<Convite[]>{
    return this.httpClient.get<Convite[]>(this.NewbaseUrl);
  }

  listarPendentes():Observable<Convite[]>{
    return this.httpClient.get<Convite[]>(this.NewbaseUrl + 'pendentes');
  }

  listarPagos():Observable<Convite[]>{
    return this.httpClient.get<Convite[]>(this.NewbaseUrl + 'pagos');
  }

  listarNaoEntregues():Observable<Convite[]>{
    return this.httpClient.get<Convite[]>(this.NewbaseUrl + 'naoentregues');
  }

  listarEntregues():Observable<Convite[]>{
    return this.httpClient.get<Convite[]>(this.NewbaseUrl + 'entregues');
  }




}
