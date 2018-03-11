import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpService } from "./service/http.service";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { PedidosComponent } from './pedidos/pedidos.component';

const appRoutes: Routes = [
  { path: "", component: PedidosComponent },
  { path: '**', redirectTo:"" }
];


@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    PedidosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }