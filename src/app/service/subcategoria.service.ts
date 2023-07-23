import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategoria } from '../model/subcategoria';

import { Filtro } from '../model/filtro';
import { Servicemodel } from './servicemodel';
import { config } from '../shared/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService  implements Servicemodel{

  constructor( private http :HttpClient) { }


  pesquisar(filtro: Filtro):Observable<Subcategoria>{

      const headers = new HttpHeaders().append(
        'Content-Type',
        'application/json'
      );
      let params = new HttpParams()
        .set('page', filtro.pagina.toString())
        .set('size', filtro.itensPorPagina.toString())


      if (filtro.parametro) {
        params = params.set('parametro', filtro.parametro);
      }
      const response = this.http.get<Subcategoria>(`${config.baseurl}subcategorias`, {
        headers,
        params,
      });
     console.log(response)
      return response;
    }
    detalhar(id: number): Observable<Subcategoria> {
      return this.http.get<Subcategoria>(`${config.baseurl}subcategorias/${id}`);
    }
    salvar(objeto: Subcategoria): Observable<Subcategoria> {
      console.log(objeto)
      const headers = new HttpHeaders().append(
        'Content-Type',
        'application/json'
      );
      const resposta= this.http
      .post<Subcategoria>(`${config.baseurl}subcategorias`, objeto, { headers });
      return resposta;

    }
    editar(objeto: Subcategoria): Observable<Subcategoria> {
      const headers = new HttpHeaders().append(
        'Content-Type',
        'application/json'
      );

      return this.http.put<Subcategoria>(`${config.baseurl}subcategorias/${objeto.id}`, objeto);

    }
    excluir(id: number): Observable<Subcategoria> {
      throw new Error('Method not implemented.');
    }
}
