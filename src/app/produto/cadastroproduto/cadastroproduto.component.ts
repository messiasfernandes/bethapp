import { Component, OnInit } from '@angular/core';
import { Filtro } from 'src/app/model/filtro';
import { Produto } from 'src/app/model/produto';
import { Subcategoria } from 'src/app/model/subcategoria';
import { SubcategoriaService } from 'src/app/service/subcategoria.service';

@Component({
  selector: 'app-cadastroproduto',
  templateUrl: './cadastroproduto.component.html',
  styleUrls: ['./cadastroproduto.component.css']
})
export class CadastroprodutoComponent implements OnInit {
  subcategorias :any=[]=[]
  produto = new Produto();
  subcategoriaFiltro =new Filtro();
  totalRegistros=0;
  url: string;
  constructor(private subcategoriaService: SubcategoriaService){

  }
  ngOnInit(): void {


  }
  carregarSubcategorias(evento: any){


    this.subcategoriaFiltro.pagina = 0;
    this.subcategoriaFiltro.parametro = evento.query;
    console.log(this.subcategoriaFiltro.parametro);
    this.subcategoriaService.pesquisar(this.subcategoriaFiltro).subscribe((dados:any) => {
      console.log( dados.content)
      this.subcategorias = dados.content;
      this.totalRegistros = dados.total;
    });;


  }
  upLoad(){

  }

}
