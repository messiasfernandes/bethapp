import { ErrohandlerService } from './../../service/errohandler.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Filtro } from 'src/app/model/filtro';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-consulta-produto',
  templateUrl: './consulta-produto.component.html',
  styleUrls: ['./consulta-produto.component.css'],
})
export class ConsultaProdutoComponent implements OnInit {
  produtofiltro = new Filtro();
  produtos: any[] = [];
  totalRegistros = 0;

  @ViewChild('tabela') grid: any;
  constructor(
    private produtoService: ProdutoService,
    private erroService: ErrohandlerService,
    private confirmacao: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.buscar();
  }
  buscar(pagina: number = 0): void {
    this.produtofiltro.pagina = pagina;
    this.produtoService
      .pesquisar(this.produtofiltro)
      .pipe(
        catchError((erro: any) => {
          return throwError(() => this.erroService.erroHandler(erro));
        })
      )
      .subscribe((dados: any) => {
        console.log(dados.content);
        this.produtos = dados.content;

        this.totalRegistros = dados.totalElements;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.buscar(pagina);
  }
  excluir(produto: any) {
    this.produtoService.excluir(produto.id)
    .pipe(
      catchError((erro: any) => {
        return throwError(() => this.erroService.erroHandler(erro));
      })
    )
    .subscribe(() => {
      this.buscar();
      this.grid.first = 0;
      this.messageService.add({
        severity: 'success',
        detail: ' Excluida com sucesso!',
      });
    });
  }
  confirmarExclusao(produto: any) {
    this.confirmacao.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(produto);
      },
    });
  }
}
