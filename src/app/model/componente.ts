import { Produto } from "./produto";

export class Componente {
  id: number;
  qtde: number=1;
  subtotal: number=0;
  produto= new Produto()
}
