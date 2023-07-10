import { Produto } from './../../model/produto';
import { ListadialogprodutoComponent } from './../listadialogproduto/listadialogproduto.component';
import { Subcategoria } from './../../model/subcategoria';
import { Atributo } from './../../model/atributo';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { Filtro } from 'src/app/model/filtro';


import { ArquivoService } from 'src/app/service/arquivo.service';
import { ErrohandlerService } from 'src/app/service/errohandler.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { SubcategoriaService } from 'src/app/service/subcategoria.service';
import { SubcategoriadialogComponent } from 'src/app/subcategoria/subcategoriadialog/subcategoriadialog.component';
import { Componente } from 'src/app/model/componente';

@Component({
  selector: 'app-cadastroproduto',
  templateUrl: './cadastroproduto.component.html',
  styleUrls: ['./cadastroproduto.component.css'],
})
export class CadastroprodutoComponent implements OnInit {
  subcategorias: any = [] = [];
  produto = new Produto();
  subcategoriaFiltro = new Filtro();
  ref: DynamicDialogRef;
  totalRegistros = 0;
  exibirFormAtributos = false;
  atributo = new Atributo();
  componente = new Componente();
  url: string;
  bloqueiaboatao = false
  show = false;

  constructor(
    private subcategoriaService: SubcategoriaService,
    private arquivoService: ArquivoService,
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private router: Router,
    public dialogService: DialogService,
    private idParametro: ActivatedRoute,
    private errorHandler: ErrohandlerService,
    public config: DynamicDialogConfig,
  ) {

  }
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
      this.getbuscarfoto(this.produto.imagemPrincipal);
      console.log(this.produto.imagemPrincipal);
    });


  }
  addAtributo() {
    this.produto.atributos.push(this.atributo);
    this.atributo = new Atributo();
  }
  carregarSubcategorias(evento: any) {
    this.subcategoriaFiltro.pagina = 0;
    this.subcategoriaFiltro.parametro = evento.query
    this.subcategoriaService
      .pesquisar(this.subcategoriaFiltro)
      .subscribe((dados: any) => {
        this.subcategorias = dados.content;
        this.totalRegistros = dados.total;
      });
    this.produto.subcategoria = this.subcategorias[0]
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
    if (image) {
      this.url = this.arquivoService.buscarfoto(image);
    } else {
      this.url = '/assets/no-image-icon.jpg'
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
  abrirdialog() {
    this.exibirFormAtributos = true
  }
  remover(index: number) {
    this.produto.atributos.splice(index, 1);
  }
  showSubcategoria() {
    this.ref = this.dialogService.open(SubcategoriadialogComponent, {
      header: 'SubCategorias',
      width: '50%',

      styleClass: "{'960px': '70vw'}",
      contentStyle: { 'max-height': '800px', overflow: 'auto' },

      resizable: false,

      baseZIndex: 10000,
      // style:"width:55vw!important; height:70% !important; top:25% !important; left: 30% !important;"
    });
    this.ref.onClose.subscribe((subcategoria: Subcategoria) => {
      if (subcategoria) {
        // this.produtov.produto = produto;
      }
    });
  }
  showLIstaProduto() {
    this.ref = this.dialogService.open(ListadialogprodutoComponent, {
      header: 'Lista de Produtos',
      width: '75%',

      styleClass: "{'960px': '70vw'}",
      contentStyle: { 'max-height': '1000px', overflow: 'auto' },

      resizable: false,

      baseZIndex: 10000,
      // style:"width:55vw!important; height:70% !important; top:25% !important; left: 30% !important;"
    });
    this.ref.onClose.subscribe((produto: Produto) => {
      if (produto) {
        this.componente.produto = produto;

        this.bloqueiaboatao = true;


      }
    });
  }
  addComponete() {

    if (this.componente.qtde <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'qtde não pdoe ser menor que zero ou igual a 0' })
    } else {
      this.produto.componentes.push(this.produtoService.adiCionarComponente(this.produto, this.componente))
      this.componente = new Componente()
      this.bloqueiaboatao = false;
    }


  }
  removerCompnente(index: number) {
    this.diminuirVarlor(index)
    this.produto.componentes.splice(index, 1);
  }
  diminuirVarlor(index: number) {

    this.produto = this.produtoService.removerComponente(index, this.produto)

  }
}

