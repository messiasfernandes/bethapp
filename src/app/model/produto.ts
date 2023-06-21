import { Atributo } from "./atributo";
import { Estoque } from "./estoque";
import { Subcategoria } from "./subcategoria";

export class Produto {

  id: number;
  nomeproduto: string;
  marca: string;
  unidade: string;
  imagemPrincipal: string;
  sku: string;
  descricao: string;
  ativo: boolean;
  codigoEan13: string;
  caracteristica: string;
  codigofabricante: string;
  precovenda: number;
  precocusto: number;
  customedio: number;
  estoqueminimo: number;
  subcategoria = new Subcategoria();
  atributos : Atributo [] = [];
}
