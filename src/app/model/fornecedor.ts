import { Cidade } from "./cidade";

export class Fornecedor {
  id: number
  nome: string;
  cpfouCnpj: string;
  cidade = new Cidade()
}
