import { InputNumberModule } from 'primeng/inputnumber';
import { Fornecedor } from './fornecedor';
import { Id } from './id';
export class Produtofornecedor {
  id= new  Id();
  fornecedor= new   Fornecedor()
  dataCompra: Date
  valorProduto:number
  garantia:number

}
