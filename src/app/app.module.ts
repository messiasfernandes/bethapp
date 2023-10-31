import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from './shared/primeng/primeng.module';
import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localePt from '@angular/common/locales/pt';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { AppRoutingModule } from './app-routing.module';

import { ConsultaProdutoComponent } from './produto/consulta-produto/consulta-produto.component';
import { ImportarnotafiscalComponent } from './notafiscal/importarnotafiscal/importarnotafiscal.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { CadastroprodutoComponent } from './produto/cadastroproduto/cadastroproduto.component';
import { MessageComponent } from './shared/message/message.component';
import { ProdutoService } from './service/produto.service';
import { ArquivoService } from './service/arquivo.service';
import { ErrohandlerService } from './service/errohandler.service';
import { SubcategoriaService } from './service/subcategoria.service';
import { HomeComponent } from './shared/home/home.component';
import { ConsultarnotafiscalComponent } from './notafiscal/consultarnotafiscal/consultarnotafiscal.component';
import { SubcategoriadialogComponent } from './subcategoria/subcategoriadialog/subcategoriadialog.component';
import { ListadialogprodutoComponent } from './produto/listadialogproduto/listadialogproduto.component';
import { VicularFonecedorprodutoComponent } from './produto/vicular-fonecedorproduto/vicular-fonecedorproduto.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
registerLocaleData(ptBr, localePt);

registerLocaleData(localePt, 'pt-BR');
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}



@NgModule({
  declarations: [
   AppComponent,
    MenuComponent,

    ConsultaProdutoComponent,
    ImportarnotafiscalComponent,
    CadastroprodutoComponent,
    MessageComponent,
    HomeComponent,
    ConsultarnotafiscalComponent,
    SubcategoriadialogComponent,
    ListadialogprodutoComponent,
    VicularFonecedorprodutoComponent,



  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PrimengModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    ProdutoService, ArquivoService, ErrohandlerService, SubcategoriaService , MessageService,TranslateService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
