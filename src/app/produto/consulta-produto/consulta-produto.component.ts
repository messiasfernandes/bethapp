import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Filtro } from 'src/app/model/filtro';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-consulta-produto',
  templateUrl: './consulta-produto.component.html',
  styleUrls: ['./consulta-produto.component.css']
})
export class ConsultaProdutoComponent implements OnInit {
  produtofiltro=new Filtro();
  produtos : any [] = [];
  totalRegistros=0;
  @ViewChild('tabela') grid: any;
  constructor(private produtoService: ProdutoService){

  }
  ngOnInit(): void {

  }
  buscar(pagina: number = 0): void {
    this.produtofiltro.pagina = pagina;
    this.produtoService.pesquisar(this.produtofiltro)
    .subscribe((dados: any) => {
      console.log(dados.content)
      this.produtos = dados.content;

      this.totalRegistros = dados.totalElements;

    });


  }
  transform(value: string): string {
    return value.replace(',', '.');
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    console.log(pagina)
    this.buscar(pagina);
  }

}
