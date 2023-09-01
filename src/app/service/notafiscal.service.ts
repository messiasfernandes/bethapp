import { EntradaNotaFiscalCabecario } from './../model/entrada-nota-fiscal-cabecario';
import { Injectable } from '@angular/core';
import { Servicemodel } from './servicemodel';
import { Observable } from 'rxjs';
import { Filtro } from '../model/filtro';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { config } from '../shared/config/config';
import { IntemsEntrada } from '../model/intems-entrada';

@Injectable({
  providedIn: 'root',
})
export class NotafiscalService implements Servicemodel {
  constructor(private http: HttpClient) {}
  pesquisar(filtro: Filtro): Observable<any> {
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
    const response = this.http.get<any>(
      `${config.baseurl}importarnotasfiscais`,
      {
        headers,
        params,
      }
    );

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
  enviarnota(
    xml: string,
    margem: number,
    idforma: number,
    qtdeparcela: number
  ): Observable<any> {

    let params = new HttpParams();
    params = params.set('xml', xml);
    params = params.set('margem', margem.toString());
    params = params.set('idforma', idforma.toString());
    params = params.set('qtdeparcela', qtdeparcela.toString());

    return this.http.post<EntradaNotaFiscalCabecario>(
      `${config.baseurl}importarnotasfiscais`,
      {},
      {
        params: params,
        observe: 'response',
      }
    );
  }
  totalNota(items: IntemsEntrada[]): number {
    if (!items) {
      return 0;
    }

    var total = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].subtotal) {
        total += items[i].subtotal as number;
      }
    }

    return total;
  }

}
