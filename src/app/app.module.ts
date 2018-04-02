import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpService } from "./service/http.service";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AllPipe, FamPipe,AutoCompletePipe } from './pipes/all.pipe';

const appRoutes: Routes = [
  { path: "", component: PedidosComponent },
  { path: '**', redirectTo:"" }
];


@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    PedidosComponent,
    AllPipe,
    FamPipe,
    AutoCompletePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
