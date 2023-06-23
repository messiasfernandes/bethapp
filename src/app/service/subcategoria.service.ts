import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategoria } from '../model/subcategoria';
import { config } from 'src/config/config';
import { Filtro } from '../model/filtro';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

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
}
