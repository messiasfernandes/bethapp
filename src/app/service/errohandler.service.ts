import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrohandlerService {

  constructor(private messageService: MessageService) {}

  erroHandler(erroResponse: any) {
    let msg: string;
    if (erroResponse == 'string') {
    } else {
      erroResponse instanceof Response;

      if ('campos' in erroResponse.error) {
        this.messageService.add({
          severity: 'error',
          detail: erroResponse.error.campos[0].mensagem,
        });
      } else {
        this.messageService.add({
          severity: 'error',
          detail: erroResponse.error.titulo,
        });
      }
    }
  }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (
      errorResponse instanceof HttpErrorResponse &&
      errorResponse.status >= 400 &&
      errorResponse.status <= 499
    ) {
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar esta ação';
      }

      try {
        msg = errorResponse.error[0].titulo;
      } catch (e) {}

      console.error('Ocorreu um erro', errorResponse);
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({ severity: 'error', detail: msg });
  }
}
