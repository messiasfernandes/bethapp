
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filtro } from '../model/filtro';

import { Produto } from '../model/produto';
import { Observable } from 'rxjs';
import { Servicemodel } from './servicemodel';
import { Componente } from '../model/componente';
import { config } from '../shared/config/config';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService implements Servicemodel {
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
  salvar(objeto: Produto): Observable<Produto> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    const resposta= this.http
    .post<Produto>(`${config.baseurl}produtos`, objeto, { headers });
    return resposta;

  }
  editar(objeto: Produto): Observable<any> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );

    return this.http.put<Produto>(`${config.baseurl}produtos/${objeto.id}`, objeto);

  }
  detalhar(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${config.baseurl}produtos/${id}`);
  }
  excluir(id: number): Observable<any> {
    return this.http.delete(`${config.baseurl}produtos/${id}`);
   }

   adiCionarComponente(produto:Produto, componente: Componente){
    componente.subtotal= componente.qtde* componente.produto.precovenda;
    produto.precovenda+=   componente.produto.precovenda*componente.qtde;
    produto.precocusto+=  componente.produto.precocusto*componente.qtde
    produto.customedio+=  componente.produto.customedio * componente.qtde
   // this.produto.componentes.push(this.componente)
   return componente
   }
   removerComponente(index: number, produto: Produto){
console.log(produto.componentes[index].produto.precovenda * produto.componentes[index].qtde )
    produto.precovenda-= produto.componentes[index].produto.precovenda * produto.componentes[index].qtde

    produto.precocusto-=produto.componentes[index].produto.precocusto * produto.componentes[index].qtde

      produto.customedio-= produto.componentes[index].produto.customedio * produto.componentes[index].qtde

      console.log(produto.customedio)
      console.log(produto.precocusto)
      return produto
   }

}
