import { FormsModule } from '@angular/forms';
import { PrimengModule } from './shared/primeng/primeng.module';
import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localePt from '@angular/common/locales/pt';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { AppRoutingModule } from './app-routing.module';

import { ConsultaProdutoComponent } from './produto/consulta-produto/consulta-produto.component';
import { ImportarnotafiscalComponent } from './notafiscal/importarnotafiscal/importarnotafiscal.component';
import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import { CadastroprodutoComponent } from './produto/cadastroproduto/cadastroproduto.component';

registerLocaleData(localePt, 'pt-BR');
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,

    ConsultaProdutoComponent,
    ImportarnotafiscalComponent,
    CadastroprodutoComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PrimengModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: "BRL"
    },

  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
