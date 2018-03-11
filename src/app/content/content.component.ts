import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../animations/animations';
import { HttpService } from "../service/http.service";
import { Producto, ResProductos } from "../interface/all-interfaces";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: [fadeInAnimation]
})
export class ContentComponent implements OnInit {

  constructor(
    public http:HttpService
  ) {
    this.getProductos();
   }

  ngOnInit() {
  }
  e:boolean = false;
  fnPush = () => {
    if(this.e){
      this.e = false;
    } else {
      this.e = true;
    }
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
