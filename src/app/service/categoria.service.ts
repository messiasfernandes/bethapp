import { Injectable } from '@angular/core';
import { Servicemodel } from './servicemodel';
import { Observable, map } from 'rxjs';
import { Filtro } from '../model/filtro';
import { Categoria } from '../model/categoria';
import { HttpClient } from '@angular/common/http';
import { config } from '../shared/config';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService implements Servicemodel{

  constructor(private http: HttpClient) { }

  pesquisar(filtro: Filtro): Observable<Categoria> {
    throw new Error('Method not implemented.');
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
