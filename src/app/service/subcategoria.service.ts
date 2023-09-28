import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategoria } from '../model/subcategoria';

import { Filtro } from '../model/filtro';
import { Servicemodel } from './servicemodel';
import { config } from '../shared/config/config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubcategoriadialogComponent } from '../subcategoria/subcategoriadialog/subcategoriadialog.component';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService  implements Servicemodel{
  ref: DynamicDialogRef;
  constructor( private http :HttpClient,
  public dialogService: DialogService,) { }


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
    showSubcategoria(){

    this.ref = this.dialogService.open(SubcategoriadialogComponent, {
        header: 'SubCategorias',
        width: '50%',

        styleClass: "{'960px': '70vw'}",
        contentStyle: { 'max-height': '800px', overflow: 'auto' },

        resizable: false,

        baseZIndex: 10000,
        // style:"width:55vw!important; height:70% !important; top:25% !important; left: 30% !important;"
      });
      this.ref.onClose.subscribe((subcategoria: Subcategoria) => {
        if (subcategoria) {
          // this.produtov.produto = produto;
        }
      });

    }
}
