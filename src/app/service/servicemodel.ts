import { Observable } from "rxjs";
import { Filtro } from "../model/filtro";

export interface Servicemodel {
  pesquisar(filtro : Filtro) : Observable<any>;
  detalhar(id: number): Observable<any>;
  salvar (objeto: any): Observable<any>;
  editar(objeto:any):Observable<any>;
  excluir(id: number): Observable<any> ;
}
