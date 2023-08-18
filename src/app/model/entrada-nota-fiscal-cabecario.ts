import { Fornecedor } from "./fornecedor"
import { IntemsEntrada } from "./intems-entrada"
import { TransporteNotafiscal } from "./transporte-notafiscal"

export class EntradaNotaFiscalCabecario {
  id: number
  numerodanota: string
  data_entrada: string
  data_emissao_nota: string
  fornecedor = new Fornecedor()
  items_entrada: IntemsEntrada[]=[]
  arquivo_nota:string;
  transporteNotafiscal = new TransporteNotafiscal()

}
