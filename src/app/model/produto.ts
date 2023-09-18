import { Componente } from './componente';
import { Atributo } from "./atributo";
import { Subcategoria } from "./subcategoria";
import { Fornecedor } from './fornecedor';
import { Produtofornecedor } from './produtofornecedor';

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
  precovenda !: number;
  precocusto!: number;
  customedio!: number;
  estoqueminimo: number;
  subcategoria = new Subcategoria();
  atributos : Atributo [] = [];
  componentes: Componente[]=[];
  fornecedores :Produtofornecedor[]=[]
}
