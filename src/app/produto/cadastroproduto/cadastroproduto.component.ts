import { Atributo } from './../../model/atributo';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { Filtro } from 'src/app/model/filtro';
import { Produto } from 'src/app/model/produto';

import { ArquivoService } from 'src/app/service/arquivo.service';
import { ErrohandlerService } from 'src/app/service/errohandler.service';
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
  exibirFormAtributos= false;
   atributo= new Atributo();
  url: string;
  constructor(
    private subcategoriaService: SubcategoriaService,
    private arquivoService: ArquivoService,
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private router: Router,
    private idParametro: ActivatedRoute,
    private errorHandler: ErrohandlerService,
  ) {}
  ngOnInit(): void {
    let codigoproduto = this.idParametro.snapshot.params['id'];

    if (codigoproduto) {
      console.log(codigoproduto);

      this.carregarProduto(codigoproduto);
    }
  }
  carregarProduto(codigoproduto: number) {
    console.log('inicou');
    this.produtoService.detalhar(codigoproduto).subscribe((data) => {
      this.produto = data;
      console.log(this.produto);
      this.getbuscarfoto(this.produto.imagemPrincipal);
      console.log(this.produto.imagemPrincipal);
    });


  }
  addAtributo(){
    this.produto.atributos.push(this.atributo);
   this.atributo= new Atributo();
  }
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
      this.produto.subcategoria=this.subcategorias[0]
  }
  upLoad() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = (_) => {
      // you can use this method to get file and perform respective operations

      let arquivo: any = Array.from(input.files as any);
      const formadata = new FormData();
      formadata.append('arquivo', arquivo[0]);
      if (this.produto.imagemPrincipal) {
        this.arquivoService.removerArquivo(
          this.produto.imagemPrincipal
        );
      }
      this.produto.imagemPrincipal = arquivo[0].name;
      var reader = new FileReader();
      reader.readAsDataURL(arquivo[0]);
      reader.onload = (event: any) => {
        console.log(event);
        this.url = event.target.result;
      };
      this.arquivoService.upload(formadata).subscribe((resposta) => {
        console.log(resposta);

        /// this.produto.imagemproduto = resposta.nomeArquivo;
      });

      ///  this.getbuscarfoto(this.produtoVariacao.imagemPrncipal);
    };
    input.click();
  }
  getbuscarfoto(image: string) {
    console.log(image)
    if (image){
      this.url = this.arquivoService.buscarfoto(image);
  }else{
    this.url ='/assets/no-image-icon.jpg'
  }
  return this.url
  }
  salvar(form: NgForm) {
    if (this.produto.id != null) {
      this.produtoService.editar(this.produto)
      .pipe(
        catchError((erro: any) => {
          return throwError(() => this.errorHandler.erroHandler(erro));
        })
      )
      .subscribe();
      this.messageService.add({
      severity: 'info',
      detail: 'Produto editado com sucesso!',
    })
    } else {
      console.log(this.produto);
      this.produtoService.salvar(this.produto).subscribe();
     ;
      this.messageService.add({
        severity: 'success',
        detail: 'Produto salvo com sucesso!',
      });
    }
    form.reset();
    this.router.navigate(['/produtos'])

  }
  abrirdialog(){
    this.exibirFormAtributos= true
  }
  remover(index: number) {
    this.produto.atributos.splice(index, 1);
  }
}

