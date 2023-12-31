import { Injectable } from '@angular/core';
import { Servicemodel } from './servicemodel';
import { Observable } from 'rxjs';
import { Filtro } from '../model/filtro';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Fornecedor } from '../model/fornecedor';
import { config } from '../shared/config/config';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService implements Servicemodel {

  constructor(private http: HttpClient) { }
  pesquisar(filtro: Filtro): Observable<Fornecedor> {
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
    const response = this.http.get<Fornecedor>(`${config.baseurl}forncedores`, {
      headers,
      params,
    });

    return response;
  }
  detalhar(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
  salvar(objeto: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  editar(objeto: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  excluir(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
