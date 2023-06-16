import { PrimengModule } from './shared/primeng/primeng.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuLateralComponent } from './shared/menu-lateral/menu-lateral.component';
import { ConsultaProdutoComponent } from './produto/consulta-produto/consulta-produto.component';
import { ImportarnotafiscalComponent } from './notafiscal/importarnotafiscal/importarnotafiscal.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuLateralComponent,
    ConsultaProdutoComponent,
    ImportarnotafiscalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PrimengModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
