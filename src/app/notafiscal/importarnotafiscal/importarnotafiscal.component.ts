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
import { MessageService } from 'primeng/api';
import { ErrohandlerService } from 'src/app/service/errohandler.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-importarnotafiscal',
  templateUrl: './importarnotafiscal.component.html',
  styleUrls: ['./importarnotafiscal.component.css'],
})
export class ImportarnotafiscalComponent implements OnInit {
  formasdepagamento:any=[]=[]

  totalRecords: number;
  formadePagmento= new Formadepagamento()
  notaFiscal = new EntradaNotaFiscalCabecario();
 auxiliar= new Auxiliar()
  constructor(private notafiscalservice:NotafiscalService, private formadePaganetoService: FormadepagamentoService, private arquivoService: ArquivoService,
    private messageService: MessageService, private errorHandler: ErrohandlerService,) {}
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
    .subscribe(formas => {
      console.log(formas)
      this.formasdepagamento = formas.map(c => ({
        label: c.nomeforma,
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
    this.notafiscalservice.enviarnota(this.notaFiscal.arquivo_nota, this.auxiliar.percentual, this.formadePagmento.id, this.auxiliar.quatidadeparcela)
    .pipe(
      catchError((erro: any) => {
        return throwError(() => this.errorHandler.erroHandler(erro));
      })
    )
    .subscribe( resposta=>{
      const statusCode = resposta.status;
      const body = resposta.body;
      this.notaFiscal.items_entrada =   body.items_entrada;

      console.log(body)
      console.log(this.notaFiscal)
      if(statusCode===201){

        this.messageService.add({
          severity: 'success',
          detail: 'Nota fiscal importada com   com sucesso!',
        });
      }

    })

  }
}
