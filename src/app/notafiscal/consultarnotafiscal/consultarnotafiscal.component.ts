import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Filtro } from 'src/app/model/filtro';
import { ErrohandlerService } from 'src/app/service/errohandler.service';
import { NotafiscalService } from 'src/app/service/notafiscal.service';

@Component({
  selector: 'app-consultarnotafiscal',
  templateUrl: './consultarnotafiscal.component.html',
  styleUrls: ['./consultarnotafiscal.component.css']
})
export class ConsultarnotafiscalComponent implements OnInit {
  ngOnInit(): void {

  }
  notafiscalfiltro = new Filtro()
  notasfiscais: any[] = [];
  totalRegistros = 0;
  url:string;
  constructor(private notafiscalService : NotafiscalService,
    private erroService: ErrohandlerService,){

  }
  buscar(pagina: number = 0): void {
    this.notafiscalfiltro.pagina = pagina;
    this.notafiscalService
      .pesquisar(this.notafiscalfiltro)
      .pipe(
        catchError((erro: any) => {
          return throwError(() => this.erroService.erroHandler(erro));
        })
      )
      .subscribe((dados: any) => {
        console.log(dados.content);
        this.notasfiscais = dados.content;

        this.totalRegistros = dados.totalElements;
      });
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.buscar(pagina);
  }
}
