import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {

  constructor(private http: HttpClient) { }

  upload(arquivo: FormData): Observable<any> {

    return this.http
      .post(`${config.baseurl}arquivos/fotos`, arquivo);

  }
  buscarfoto(parametro: string){
    var arquivo :string;

     arquivo= `${config.baseurl}arquivos/fotos`+ parametro;

   return arquivo;
  }

  removerArquivo(nomeArquivo: string){
    window.alert("pasou")
    return this.http
    .delete(`${config.baseurl}arquivos/fotos${nomeArquivo}`,)
    .subscribe(
    () => null);
  }
}
