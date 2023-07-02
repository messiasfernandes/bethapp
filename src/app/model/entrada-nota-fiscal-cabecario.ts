import { IntemsEntrada } from "./intems-entrada"

export class EntradaNotaFiscalCabecario {
  id: number
  numerodanota: string
  data_entrada: string
  data_emissao_nota: string
 // fornecedor: Fornecedor
  items_entrada: IntemsEntrada[]

}
