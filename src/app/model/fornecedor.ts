import { Cidade } from "./cidade";

export class Fornecedor {
  nome: string;
  cpfouCnpj: string;
  cidade = new Cidade()
}
