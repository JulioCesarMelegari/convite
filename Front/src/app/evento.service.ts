import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evento } from './evento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

   public baseUrlConvite: string = 'http://localhost:8080/apiConvite/evento'


  constructor(private httpClient: HttpClient) { }

  salvarEvento(evento:Evento):Observable<any>{
    return this.httpClient.post<any>(this.baseUrlConvite + '/cadastrar', evento);
  }
  getEvento():Observable<Evento[]>{
    return this.httpClient.get<Evento[]>(this.baseUrlConvite);
  }
  getEventoById(id:number):Observable<Evento>{
    return this.httpClient.get<Evento>(this.baseUrlConvite + '/'+`${id}`);
  }
  getEventoPendente():Observable<Evento[]>{
    return this.httpClient.get<Evento[]>(this.baseUrlConvite+'/pendentes');
  }
  getEventoFinalizados():Observable<Evento[]>{
    return this.httpClient.get<Evento[]>(this.baseUrlConvite+'/finalizados');
  }
  updateEvento(id:number, evento:Evento):Observable<Evento>{
    return this.httpClient.put<Evento>(this.baseUrlConvite+'/editar/'+`${id}`, Evento);
  }
  deletar(id:any){
    return this.httpClient.delete(this.baseUrlConvite + '/'+`${id}`);
  }
  getEventoPorNome(eventoNome:string):Observable<Evento>{
    return this.httpClient.get<Evento>(this.baseUrlConvite +'/busca/'+`${eventoNome}`);
  }

}
