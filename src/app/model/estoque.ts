import { Produto } from "./produto";

export class Estoque {

  id: number;
  produto = new Produto();
  quantidade: number;
}
