import { Componente } from './componente';
import { Atributo } from "./atributo";
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
   controlarestoque: boolean;
  precovenda: number=0;
  precocusto: number=0;
  customedio: number=0;
  estoqueminimo: number;
  subcategoria = new Subcategoria();
  atributos : Atributo [] = [];
  componentes: Componente[]=[];
}
