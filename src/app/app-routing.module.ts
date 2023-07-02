import { ConsultaProdutoComponent } from './produto/consulta-produto/consulta-produto.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportarnotafiscalComponent } from './notafiscal/importarnotafiscal/importarnotafiscal.component';
import { CadastroprodutoComponent } from './produto/cadastroproduto/cadastroproduto.component';
import { Breadcrumb } from 'primeng/breadcrumb';


const routes: Routes = [
  {
    path: 'produtos',data: { breadcrumb: 'Produtos', }, component: ConsultaProdutoComponent,
 },
  { path: 'produtos/novo',component: CadastroprodutoComponent},
  { path: 'produtos/:id', component: CadastroprodutoComponent },
  { path: 'importarnotalfiscal', component: ImportarnotafiscalComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
