import { Subcategoria } from 'src/app/model/subcategoria';
import { Categoria } from './../../model/categoria';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-subcategoriadialog',
  templateUrl: './subcategoriadialog.component.html',
  styleUrls: ['./subcategoriadialog.component.css']
})
export class SubcategoriadialogComponent implements OnInit {

  categorias: any = [] = []
  subcategoria = new Subcategoria()
  constructor(private categoriaService: CategoriaService,
    private messageService: MessageService
  ) {

  }
  ngOnInit(): void {
    this.carregarCategorias()
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .subscribe(categoriasresposta => {
        this.categorias = categoriasresposta
  }


 ) }


}


