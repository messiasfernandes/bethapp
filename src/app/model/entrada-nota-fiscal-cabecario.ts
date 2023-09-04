import { Fornecedor } from './fornecedor';
import { ImpostoNota } from './imposto-nota';
import { IntemsEntrada } from './intems-entrada';
import { TransporteNotafiscal } from './transporte-notafiscal';

export class EntradaNotaFiscalCabecario {
  id: number;
  numerodanota: string;
  data_hora_entrada: string;
  data_hora_emissao_nota: string;
  fornecedor = new Fornecedor();
  items_entrada: IntemsEntrada[] = [];
  arquivo_nota: string;
  naturezaopercao: string;
  serie: string;
  modelo: string;
  chaveNota: string;
  totalProduto:number;
  impostoNota =  new ImpostoNota()
  transporteNotafiscal = new TransporteNotafiscal();
}
