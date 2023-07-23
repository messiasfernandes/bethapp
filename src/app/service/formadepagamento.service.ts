import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formadepagamento } from '../model/formadepagamento';
import { config } from '../shared/config/config';
;

@Injectable({
  providedIn: 'root'
})
export class FormadepagamentoService {

  constructor(private http: HttpClient) { }
  listaTodas():Promise<Formadepagamento[]>{
    return this.http.get<Formadepagamento[]>(`${config.baseurl}formadepagamentos`).toPromise()

  }
}
