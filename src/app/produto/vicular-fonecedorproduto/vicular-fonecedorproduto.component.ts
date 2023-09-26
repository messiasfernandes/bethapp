import { Produtofornecedor } from './../../model/produtofornecedor';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Filtro } from 'src/app/model/filtro';
import { FornecedorService } from 'src/app/service/fornecedor.service';

@Component({
  selector: 'app-vicular-fonecedorproduto',
  templateUrl: './vicular-fonecedorproduto.component.html',
  styleUrls: ['./vicular-fonecedorproduto.component.css'],
})
export class VicularFonecedorprodutoComponent {
  fornecedores: any = ([] = []);
  forncedorFiltro = new Filtro();
  produtoforncedor = new Produtofornecedor();
  constructor(
    private fornecdorservice: FornecedorService,
    public ref: DynamicDialogRef
  ) {}

  buscarForncedor(evento: any) {
    this.forncedorFiltro.pagina = 0;
    this.forncedorFiltro.parametro = evento.query;
    this.fornecdorservice
      .pesquisar(this.forncedorFiltro)
      .subscribe((dados: any) => {
        this.fornecedores = dados.content;
        console.log(this.fornecedores);
        // this.totalRegistros = dados.total;
      });
    this.produtoforncedor.fornecedor = this.fornecedores[0];
  }
  selecionarProdutoFornecedor() {
console.log('pasou '+this.produtoforncedor.id.fornecedoid)

    this.ref.close(this.produtoforncedor);
  }
}
