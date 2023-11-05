import { LazyLoadEvent } from "primeng/api";

export interface Util {
  buscar (pagina: number): void;
  mudardePagina(event: LazyLoadEvent) : number;
}
