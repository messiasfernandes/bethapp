import { Subcategoria } from 'src/app/model/subcategoria';
import { Categoria } from './../../model/categoria';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs/internal/operators/map';
import { Filtro } from 'src/app/model/filtro';
import { DynamicDialogRef,DynamicDialogConfig } from 'primeng/dynamicdialog';
import { NgForm } from '@angular/forms';
import { ErrohandlerService } from 'src/app/service/errohandler.service';
import { SubcategoriaService } from 'src/app/service/subcategoria.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-subcategoriadialog',
  templateUrl: './subcategoriadialog.component.html',
  styleUrls: ['./subcategoriadialog.component.css'],
})
export class SubcategoriadialogComponent implements OnInit {
  categorias: any = ([] = []);
  subcategoria = new Subcategoria();
  categoriaFiltro = new Filtro();
  totalRegistros = 0;
  intputCat: boolean=false;
  constructor(
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    private errorHandler: ErrohandlerService,
    private subcategoriaService: SubcategoriaService,
    public config: DynamicDialogConfig
  ) {

  //  console.log('config.data:', this.config.data);
   // console.log('config.data.objetoOriginal:', this.config.data.objetoOriginal);

  //  if (this.config.data.objetoOriginal != null) {
 // this.subcategoria = this.config.data.objetoOriginal;
// }
if (this.config.data && this.config.data.objetoOriginal != null) {
  this.subcategoria = this.config.data.objetoOriginal;
}
  }
  ngOnInit(): void {}
  cadastrarCategoria(){
    this.intputCat=true;
  }
  carregarCategorias(evento: any) {
    this.categoriaFiltro.pagina = 0;
    this.categoriaFiltro.parametro = evento.query;

    console.log(this.categoriaFiltro.parametro);
    this.categoriaService
      .pesquisar(this.categoriaFiltro)
      .subscribe((dados: any) => {
        console.log(dados.content);
        this.categorias = dados.content;
        this.totalRegistros = dados.total;
      });
  }
  selecionarSubcatecoria() {
    this.ref.close(this.subcategoria);
  }
  salvar(form: NgForm) {
   let erroOcorrido= false;
   if (this.subcategoria.id != null) {

    this.subcategoriaService
      .editar(this.subcategoria)
      .pipe(
        catchError((erro: any) => {
          return throwError(() => this.errorHandler.erroHandler(erro));
        })
      )
      .subscribe((response: Subcategoria) => {

     {
          this.messageService.add({
            severity: 'info',
            detail: 'subcategoria editado com sucesso!',
          });
         // form.reset();
        this.selecionarSubcatecoria()
        }
      });
    }else
    this.subcategoriaService.salvar(this.subcategoria)
    .pipe(
      catchError((erro: any) => {
        erroOcorrido = true;
        this.errorHandler.erroHandler(erro);
        return throwError(() => erro);
      })
    )
    .subscribe(() => {
      if (!erroOcorrido) {
        this.messageService.add({
          severity: 'success',
          detail: 'Subcategoria salva com sucesso!',
        });

      }
    });;
   // form.reset();
    this.ref.close();
  }
}
