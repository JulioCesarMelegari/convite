import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Convite } from './convite';
import { Observable } from 'rxjs';
import { Cadstro } from './cadastro';

@Injectable({
  providedIn: 'root'
})
export class ConviteService {

  public NewbaseUrl: string = 'http://localhost:8080/convites'

  constructor(private httpClient: HttpClient) { }

  salvarConvite(formConvite:Cadstro):Observable<Cadstro>{
    return this.httpClient.post<Cadstro>(this.NewbaseUrl, formConvite);
  }

}
