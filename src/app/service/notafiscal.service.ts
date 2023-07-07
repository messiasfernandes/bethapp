import { Injectable } from '@angular/core';
import { Servicemodel } from './servicemodel';
import { Observable } from 'rxjs';
import { Filtro } from '../model/filtro';

@Injectable({
  providedIn: 'root'
})
export class NotafiscalService implements Servicemodel{

  constructor() { }
  pesquisar(filtro: Filtro): Observable<any> {
    throw new Error('Method not implemented.');
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
