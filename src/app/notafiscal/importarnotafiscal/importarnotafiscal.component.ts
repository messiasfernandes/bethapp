import { Filtro } from 'src/app/model/filtro';
import { EntradaNotaFiscalCabecario } from './../../model/entrada-nota-fiscal-cabecario';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { NotafiscalService } from 'src/app/service/notafiscal.service';
import { FormadepagamentoService } from 'src/app/service/formadepagamento.service';
import { Formadepagamento } from 'src/app/model/formadepagamento';
import { Auxiliar } from 'src/app/model/auxiliar';
import { NgForm } from '@angular/forms';
import { ArquivoService } from 'src/app/service/arquivo.service';

@Component({
  selector: 'app-importarnotafiscal',
  templateUrl: './importarnotafiscal.component.html',
  styleUrls: ['./importarnotafiscal.component.css'],
})
export class ImportarnotafiscalComponent implements OnInit {
  formasdepagamento:any=[]=[]
  formadePagmento= new Formadepagamento()
  notaFiscal = new EntradaNotaFiscalCabecario();
 auxiliar= new Auxiliar()
  constructor(private notafiscalservice:NotafiscalService, private formadePaganetoService: FormadepagamentoService, private arquivoService: ArquivoService) {}
  ngOnInit(): void {
    this.listaformas();
  }

  enviaXmlNota() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = (_) => {
      // you can use this method to get file and perform respective operations

      let arquivo: any = Array.from(input.files as any);
      const formadata = new FormData();
      formadata.append('arquivo', arquivo[0]);
      this.notaFiscal.arquivo_nota= arquivo[0].name
      var reader = new FileReader();
      reader.readAsDataURL(arquivo[0]);
      reader.onload = (event: any) => {
        console.log(event);
        //  this.url = event.target.result;
      };
      this.arquivoService.enviarNota(formadata).subscribe((resposta) => {
        console.log(resposta);

        /// this.produto.imagemproduto = resposta.nomeArquivo;
      });



    };
    input.click();
  }
  listaformas(){
    this.formadePaganetoService.listaTodas()
    .then(formas => {
      console.log(formas)
      this.formasdepagamento = formas.map(c => ({
        label: this.verificarEConverter(c.nomeforma),
        value: c.id
      }));

    })

  }
  verificarEConverter(value: String): string {
    console.log(value)
    if (typeof value === 'string') {
      return value.trim();
    } else {
      return String(value).trim();
    }
  }
  enviarNota(form: NgForm){

  }
}
