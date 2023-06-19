import { config } from './../../config/config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filtro } from '../model/filtro';

import { Produto } from '../model/produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private http: HttpClient) {}

  pesquisar(filtro: Filtro): Observable<Produto> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.parametro) {
      params = params.set('paramentro', filtro.parametro);
    }
    const response = this.http.get<Produto>(`${config.baseurl}produtos`, {
      headers,
      params,
    });

    return response;
  }
}
