import { Formadepagamento } from "./formadepagamento";

export class Parcela {
  formadePagmamento = new Formadepagamento();
  percentual: number
  totalpercentual: number
  numeroparcela: number
  dias: number
}
