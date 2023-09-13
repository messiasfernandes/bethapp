import { Estado } from './estado';

export class Cidade {
  cod_municipio: number;
  nome: string;
  estado = new Estado();
}
