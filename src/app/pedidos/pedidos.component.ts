import { Component, OnInit } from '@angular/core';
import { HttpService } from "../service/http.service";
import { Producto, ResProductos } from "../interface/all-interfaces";
import { fadeInAnimation } from '../animations/animations';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
  animations: [fadeInAnimation]
})
export class PedidosComponent implements OnInit {

  constructor(
    public http:HttpService
  ) {
    this.getProductos();
   }

  ngOnInit() {
  }
  productos:Producto[] = [];

  getProductos = () => {
    let path:string = "http://149.56.132.255/API/vLatamERP_db_dat/v1/art_m?api_key=api1234";
    this.http.get(path).then(res => {
      console.log(res);
      let data:ResProductos = res;
      this.productos = res.art_m;
    })
  }

}
