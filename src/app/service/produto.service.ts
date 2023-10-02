import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filtro } from '../model/filtro';

import { Produto } from '../model/produto';
import { Observable, map } from 'rxjs';
import { Servicemodel } from './servicemodel';
import { Componente } from '../model/componente';
import { config } from '../shared/config/config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListadialogprodutoComponent } from '../produto/listadialogproduto/listadialogproduto.component';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService implements Servicemodel {
  ref: DynamicDialogRef;
  componente = new Componente();
  constructor(private http: HttpClient, public dialogService: DialogService) {}

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
    const resposta = this.http.post<Produto>(
      `${config.baseurl}produtos`,
      objeto,
      { headers }
    );
    return resposta;
  }
  editar(objeto: Produto): Observable<any> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );

    return this.http.put<Produto>(
      `${config.baseurl}produtos/${objeto.id}`,
      objeto,
      { headers, observe: 'response' }
    );
  }
  detalhar(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${config.baseurl}produtos/${id}`);
  }
  excluir(id: number): Observable<any> {
    return this.http.delete(`${config.baseurl}produtos/${id}`);
  }

  adiCionarComponente(produto: Produto, componente: Componente) {
    produto.customedio = this.converterNaN(produto.customedio);
    produto.precocusto = this.converterNaN(produto.precocusto);
    produto.precovenda = this.converterNaN(produto.precovenda);
    componente.subtotal = componente.qtde * componente.produto.precovenda;
    console.log(componente.subtotal);
    produto.precovenda += componente.subtotal; //componente.produto.precovenda * componente.qtde;
    produto.precocusto += componente.produto.precocusto * componente.qtde;
    produto.customedio += componente.produto.customedio * componente.qtde;

    // this.produto.componentes.push(this.componente)
    return componente;
  }

  converterNaN(valor: number) {
    console.log(valor);
    return isNaN(valor) ? 0 : valor;
  }
  removerComponente(index: number, produto: Produto) {
    produto.customedio = this.converterNaN(produto.customedio);
    produto.precocusto = this.converterNaN(produto.precocusto);
    produto.precovenda = this.converterNaN(produto.precovenda);
    console.log(
      produto.componentes[index].produto.precovenda *
        produto.componentes[index].qtde
    );
    produto.precovenda -=
      produto.componentes[index].produto.precovenda *
      produto.componentes[index].qtde;

    produto.precocusto -=
      produto.componentes[index].produto.precocusto *
      produto.componentes[index].qtde;

    produto.customedio -=
      produto.componentes[index].produto.customedio *
      produto.componentes[index].qtde;

    produto.customedio = this.converterNaN(produto.customedio);
    produto.precocusto = this.converterNaN(produto.precocusto);
    produto.precovenda = this.converterNaN(produto.precovenda);
    return produto;
  }
  showdialog(componente: Componente) {
    this.ref = this.dialogService.open(ListadialogprodutoComponent, {
      header: 'Lista de Produtos',
      width: '75%',

      styleClass: "{'960px': '70vw'}",
      contentStyle: { 'max-height': '1000px', overflow: 'auto' },

      resizable: false,

      baseZIndex: 10000,
      // style:"width:55vw!important; height:70% !important; top:25% !important; left: 30% !important;"
    });
    this.ref.onClose.subscribe((produto: Produto) => {
      if (produto) {
        componente.produto = produto;

        // this.bloqueiaboatao = true;
      }
    });
  }
  GerarEn13(): Observable<string> {
    return this.http.post<string>(
      `${config.baseurl}produtos/gerarean13`,
      {},
      {
        observe: 'response',
      }
    ).pipe(
      map(response => response.body as string) // Extrair o corpo da resposta e convertê-lo em string
    );
  }
}
