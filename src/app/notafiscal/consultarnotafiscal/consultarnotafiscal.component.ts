import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Filtro } from 'src/app/model/filtro';

@Component({
  selector: 'app-consultarnotafiscal',
  templateUrl: './consultarnotafiscal.component.html',
  styleUrls: ['./consultarnotafiscal.component.css']
})
export class ConsultarnotafiscalComponent {
  notafiscalfiltro = new Filtro()
  notasfiscais: any[] = [];
  totalRegistros = 0;
  url:string;
  buscar(pagina: number = 0): void {

  }
  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.buscar(pagina);
  }
}
