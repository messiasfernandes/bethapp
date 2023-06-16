import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filtro } from '../model/filtro';
import { config } from '../shared/config';
import { Produto } from '../model/produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {


  constructor(private http: HttpClient) { }

  pesquisar(filtro: Filtro)  {
    const headers = new HttpHeaders()


      .append('Content-Type', 'application/json');
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString())


    if (filtro.paranmetro) {
      params = params.set('paramentro', filtro.paranmetro);
    }
    const response = this.http.get<any>(`${config.baseurl}produtos/`, { headers, params }).subscribe(
      (produtosResposta) => {
        const resultado = {
          produtosResposta: response.content,
          total: produtosResposta.totalElements

        };


        return resultado
      });

  }
}
