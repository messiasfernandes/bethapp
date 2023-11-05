import { Filtro } from 'src/app/model/filtro';
import { SubcategoriaService } from '../../service/subcategoria.service';
import { Component, OnInit } from '@angular/core';
import { ErrohandlerService } from 'src/app/service/errohandler.service';
import { catchError, throwError } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';
import { ControllerUtil } from 'src/app/utils/controller-util';
import { Subcategoria } from 'src/app/model/subcategoria';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubcategoriadialogComponent } from '../subcategoriadialog/subcategoriadialog.component';

@Component({
  selector: 'app-listacategoriasdialog',
  templateUrl: './listasubcategoriasdialog.component.html',
  styleUrls: ['./listasubcategoriasdialog.component.css'],
})
export class ListaSubcategoriasdialogComponent implements OnInit {
  subcategoriaFiltro = new Filtro();
  totalRegistros = 0;

  subcategorias: any[] = [];
  ngOnInit(): void {

  }
  constructor(
    private subCtegoriaService: SubcategoriaService,
    private erroService: ErrohandlerService,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
  ) {}

  buscar(pagina: number = 0): void {
    this.subcategoriaFiltro.pagina = pagina;
    this.subCtegoriaService
      .pesquisar(this.subcategoriaFiltro)
      .pipe(
        catchError((erro: any) => {
          return throwError(() => this.erroService.erroHandler(erro));
        })
      )
      .subscribe((dados: any) => {
        console.log(dados.content);
        this.subcategorias = dados.content;

        this.totalRegistros = dados.totalElements;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina= event!.first! / event!.rows!;
    this.buscar(pagina);
  }

    showSubcategoria() {
      this.subCtegoriaService.cadastroSubcategoriadialog();
     }
     selecionarProduto(subecategoria: any){
      console.log(subecategoria)

       this.ref.close(subecategoria);
       }
      }
