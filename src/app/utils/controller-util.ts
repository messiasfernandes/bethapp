import { LazyLoadEvent } from "primeng/api";
import { Util } from "./util";

export class ControllerUtil implements Util {
  mudardePagina(event: LazyLoadEvent):number{
    const pagina= event!.first! / event!.rows!;
     return pagina;
  }
  buscar(pagina: number): void {

  }
}
