import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Convite } from './convite';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConviteService {

  public NewbaseUrl: string = 'http://localhost:8080/convites'

  constructor(private httpClient: HttpClient) { }

  salvarConvite(convite:Convite):Observable<Convite>{
    return this.httpClient.post<Convite>(this.NewbaseUrl, convite);
  }

}
