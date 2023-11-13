import { Subcategoria } from './../model/subcategoria';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { Filtro } from '../model/filtro';
import { Servicemodel } from './servicemodel';
import { config } from '../shared/config/config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubcategoriadialogComponent } from '../subcategoria/subcategoriadialog/subcategoriadialog.component';
import { ListaSubcategoriasdialogComponent } from '../subcategoria/listacategoriasdialog/ListasubcategoriasdialogComponent';

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
    showSubcategoria(subCategoria: any){

    this.ref = this.dialogService.open(ListaSubcategoriasdialogComponent, {
        header: 'Lista de SubCategorias',
        width: '90%', modal:true,

       // styleClass: "{'960px': '70vw'}",
      //  contentStyle: { 'max-height': '800px', overflow: 'auto' },
      contentStyle: { overflow: 'auto' },
        resizable: false,

        baseZIndex: 10000,
        // style:"width:55vw!important; height:70% !important; top:25% !important; left: 30% !important;"
      });
      this.ref.onClose.subscribe((subcategoria: Subcategoria) => {
        if (subcategoria) {

            subCategoria =subcategoria

        }
      });

    }
    cadastroSubcategoriadialog(){

      this.ref = this.dialogService.open(SubcategoriadialogComponent, {
          header: ' Adicionar SubCategorias',
          width: '70%', modal:true,
       //   maximizable: true,

       //  styleClass: "{'960px': '70vw'}",
  //      contentStyle: { 'max-height': '800px', overflow: 'auto' },

         // resizable: false,

         // baseZIndex: 10000,
          // style:"width:55vw!important; height:70% !important; top:25% !important; left: 30% !important;"
        });
        this.ref.onClose.subscribe((subcategoria: Subcategoria) => {
          if (subcategoria) {
           this.addsubcategoria(subcategoria)
          }
        });

      }
      addsubcategoria( subcategoria: Subcategoria){
        return subcategoria
      }
      showdialogEdit(subcategoria:any){
       this.ref = this.dialogService.open(SubcategoriadialogComponent, {
          data: {
            objetoOriginal: subcategoria
          },
          modal: true,
          header: 'Editar Subcategoria',
          width: '70%'
        });

       this. ref.onClose.subscribe((objetoEditado:Subcategoria) => {
          // Faça algo com o objeto editado, por exemplo, atualize a lista de objetos
          console.log('Objeto Editado:', objetoEditado);
        });
      }


}
