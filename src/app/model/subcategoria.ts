import { Categoria } from "./categoria";

export class Subcategoria {
  id: number;
  nomeSubCategoria: string;
  categoria = new Categoria();
}
