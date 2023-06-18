import { ConsultaProdutoComponent } from './produto/consulta-produto/consulta-produto.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportarnotafiscalComponent } from './notafiscal/importarnotafiscal/importarnotafiscal.component';

const routes: Routes = [
  {
    path: 'produtos',data: { breadcrumb: 'Produtos', }, component: ConsultaProdutoComponent },
  //  { path: 'produtos',component: ConsultaProdutoComponent},
  { path: 'importarnotalfiscal', component: ImportarnotafiscalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
