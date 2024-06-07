import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Convite } from './convite';
import { Observable } from 'rxjs';
import { Cadastro } from './cadastro';
import { FormRecebimento } from './formRecebimento';
import { FormEntrega } from './formEntrega';
import { Usuario } from './usuario';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ConviteService {

  public baseUrlConvite: string = 'http://localhost:8080/apiConvite/convites'


  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  salvarConvite(formConvite:Cadastro):Observable<any>{
    const headers = this.loginService.adicionarHeader();
    return this.httpClient.post<any>(this.baseUrlConvite + '/cadastrar', formConvite, {headers});
  }

  getConviteById(id:any):Observable<any>{
    return this.httpClient.get<any>(this.baseUrlConvite+'/'+`${id}`);
  }

  updateCadastrar(id:number, formConvite:Cadastro):Observable<Cadastro>{
    return this.httpClient.put<Cadastro>(this.baseUrlConvite+'/cadastrar/'+`${id}`, formConvite);
  }

  pagar(id:number, formPagamento:FormRecebimento):Observable<FormRecebimento>{
    return this.httpClient.put<FormRecebimento>(this.baseUrlConvite+'/pagar/'+`${id}`, formPagamento);
  }

  entregar(id:number, formEntrega:FormEntrega):Observable<FormEntrega>{
    return this.httpClient.put<FormEntrega>(this.baseUrlConvite+'/entregar/'+`${id}`, formEntrega);
  }

  deletar(id:any){
    return this.httpClient.delete(this.baseUrlConvite+`${id}`);
  }

  listarTodos():Observable<Convite[]>{
    return this.httpClient.get<Convite[]>(this.baseUrlConvite);
  }

  listarPendentes():Observable<Convite[]>{
    return this.httpClient.get<Convite[]>(this.baseUrlConvite + '/pendentes');
  }

  listarPagos():Observable<Convite[]>{
    return this.httpClient.get<Convite[]>(this.baseUrlConvite + '/pagos');
  }

}
