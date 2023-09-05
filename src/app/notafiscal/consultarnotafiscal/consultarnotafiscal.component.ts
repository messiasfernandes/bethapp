import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Filtro } from 'src/app/model/filtro';
import { ErrohandlerService } from 'src/app/service/errohandler.service';
import { NotafiscalService } from 'src/app/service/notafiscal.service';

@Component({
  selector: 'app-consultarnotafiscal',
  templateUrl: './consultarnotafiscal.component.html',
  styleUrls: ['./consultarnotafiscal.component.css'],
})
export class ConsultarnotafiscalComponent implements OnInit {
  ngOnInit(): void {}
  notafiscalfiltro = new Filtro();
  notasfiscais: any[] = [];
  totalRegistros = 0;
  url: string;
  constructor(
    private notafiscalService: NotafiscalService,
    private erroService: ErrohandlerService,
    private confirmacao: ConfirmationService,
    private messageService: MessageService
  ) {}
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

  buscarCancelado(pagina: number = 0): void {
    this.notafiscalfiltro.pagina = pagina;
    this.notafiscalService
      .pesquisarCancelado(this.notafiscalfiltro)
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
  cancelar(notafiscal: any){
    this.notafiscalService.cancelar(notafiscal.id)
    .pipe(
      catchError((erro: any) => {
        return throwError(() => this.erroService.erroHandler(erro));
      })
    )
    .subscribe(() => {
      this.buscar();
     /// this.grid.first = 0;
      this.messageService.add({
        severity: 'success',
        detail: ' Excluida com sucesso!',
      });
    });

  }
  confirmarCancelar(notafiscal: any) {
    this.confirmacao.confirm({
      message: 'Tem certeza que deseja cancelar nota?',
      accept: () => {
        this.cancelar(notafiscal);
      },
    });
  }
}
