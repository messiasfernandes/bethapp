import { Filtro } from 'src/app/model/filtro';
import { EntradaNotaFiscalCabecario } from './../../model/entrada-nota-fiscal-cabecario';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';

@Component({
  selector: 'app-importarnotafiscal',
  templateUrl: './importarnotafiscal.component.html',
  styleUrls: ['./importarnotafiscal.component.css']
})
export class ImportarnotafiscalComponent  implements OnInit{

  notaFiscal= new  EntradaNotaFiscalCabecario();

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  upLoad(){
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
      //  this.url = event.target.result;
      };


      ///  this.getbuscarfoto(this.produtoVariacao.imagemPrncipal);
    };
    input.click();

  }

}
