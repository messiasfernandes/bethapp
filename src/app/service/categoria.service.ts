import { Injectable } from '@angular/core';
import { Servicemodel } from './servicemodel';
import { Observable, map } from 'rxjs';
import { Filtro } from '../model/filtro';
import { Categoria } from '../model/categoria';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { config } from '../shared/config/config';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService implements Servicemodel{

  constructor(private http: HttpClient) { }

  pesquisar(filtro: Filtro): Observable<Categoria> {
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
    const response = this.http.get<Categoria>(`${config.baseurl}categorias`, {
      headers,
      params,
    });

    return response;
  }
  detalhar(id: number): Observable<Categoria> {
    throw new Error('Method not implemented.');
  }
  salvar(objeto: any): Observable<Categoria> {
    throw new Error('Method not implemented.');
  }
  editar(objeto: any): Observable<Categoria> {
    throw new Error('Method not implemented.');
  }
  excluir(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
  listarTodas(): Observable<any> {
    return this.http.get(`${config.baseurl}categorias`)
  }
  }
