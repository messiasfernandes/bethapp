import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Filtro } from 'src/app/model/filtro';
import { Produto } from 'src/app/model/produto';
import { Subcategoria } from 'src/app/model/subcategoria';
import { ArquivoService } from 'src/app/service/arquivo.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { SubcategoriaService } from 'src/app/service/subcategoria.service';

@Component({
  selector: 'app-cadastroproduto',
  templateUrl: './cadastroproduto.component.html',
  styleUrls: ['./cadastroproduto.component.css'],
})
export class CadastroprodutoComponent implements OnInit {
  subcategorias: any = ([] = []);
  produto = new Produto();
  subcategoriaFiltro = new Filtro();
  totalRegistros = 0;
  url: string;
  constructor(
    private subcategoriaService: SubcategoriaService,
    private arquivoService: ArquivoService,
    private produtoSerice: ProdutoService
  ) {}
  ngOnInit(): void {}
  carregarSubcategorias(evento: any) {
    this.subcategoriaFiltro.pagina = 0;
    this.subcategoriaFiltro.parametro = evento.query;
    console.log(this.subcategoriaFiltro.parametro);
    this.subcategoriaService
      .pesquisar(this.subcategoriaFiltro)
      .subscribe((dados: any) => {
        console.log(dados.content);
        this.subcategorias = dados.content;
        this.totalRegistros = dados.total;
      });
  }
  upLoad() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = (_) => {
      // you can use this method to get file and perform respective operations

      let arquivo: any = Array.from(input.files as any);
      const formadata = new FormData();
      formadata.append('arquivo', arquivo[0]);

      var reader = new FileReader();
      reader.readAsDataURL(arquivo[0]);
      reader.onload = (event: any) => {
        console.log(event);
        this.url = event.target.result;
      };

      ///  this.getbuscarfoto(this.produtoVariacao.imagemPrncipal);
    };
    input.click();
  }

  salvar(form: NgForm) {}
}
