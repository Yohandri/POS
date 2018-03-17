import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../animations/animations';
import { HttpService } from "../service/http.service";
import { Producto, ResProductos, Familia } from "../interface/all-interfaces";
declare var Materialize:any;
declare var $:any;
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
    //let api = localStorage.getItem("api_key");
    setTimeout(() => {
      $(".button-collapse").sideNav({closeOnClick: true});
      $('.modal').modal({dismissible: false});
      //$('#modalApiKey').modal('open');
      
    },500);
      this.getFamilias();
      this.getContactos();
   }

  ngOnInit() {
  }
  e:boolean = false;
  productos:Producto[] = [];
  venta:Producto[] = [];
  search:string = "";
  familias:any = [];
  apiKey:string = 'api1234';
  totales:any = {total:0,Ticket:"0001", nombre:""};
  prodSeleccionado:any = 0;
  observaciones:string = '';
  btnSearch:boolean = true;
  contactos:any = [];
  dominio:string = 'http://149.56.132.255';
  modelContacto:any = {id:0,name:"",es_clt:false,cif:"",cmr:"",mon_c:""};
  cargando:boolean = false;
  idCliente:number = 0;
  guardarFactura = () => {
    let fecha = new Date().toISOString();
    let hora = new Date(fecha).toISOString();
    let body:any = {
      "id": 0,
      "emp": "",
      "emp_div": "",
      "name": this.totales.nombre,
      "fch": fecha,
      "hor": hora,
      "clt": this.idCliente, //Cliente
      "obs": this.observaciones,
      "trm_tpv": 0,//Terminal
      "tot": 0,//Total factura
      "dep_tpv": 0,//id cliente
      "mes_t": 0,
    };
    //console.log(body);
    let path = this.dominio + "/API/vLatamERP_db_dat/v1/fac_apa_t?api_key=" + this.apiKey;
    this.cargando = true;    
    this.http.post(path,body).then(res => {
      let data = res.fac_apa_t;
      this.cargando = false; 
      this.venta.forEach((i,index)=>{
        this.guardarLineas(data[0].id,i);
      });
    });
    
  }
  guardarLineas = (id:number, articulo:any) => {
    //console.log(articulo);
    let body:any = {
      "id": 0,
      "fac_apa": id,//id cabecera
      "id_art": articulo.id,
      "name": articulo.name,
      "can": articulo.cantidad,
      "pre": articulo.pvp,
      "por_dto": 0,//descuento
      "por_dto_2": 0,//descuento 2
      "pre_net": articulo.total,//precio neto
      "imp": 0,//importe
      "por_iva": 0,//iva
      "mes_t": 0//mesa
    };
    //console.log(body);
    let path = this.dominio + "/API/vLatamERP_db_dat/v1/fac_apa_lin_t?api_key=" + this.apiKey;
    this.cargando = true; 
    this.http.post(path,body).then(res => {
      this.cargando = false;
      Materialize.toast("Guardado con exito",4000);
      this.venta = [];
      this.totales = {total:0,Ticket:"0001", nombre:""};
      this.observaciones = '';
      this.idCliente = 0;
      let data = res.fac_apa_t; 
    });
  }
  addObservaciones = () => {
    $('#modalAddObservaciones').modal('open');
  }
  fnAddNuevo = () => {
    $('#modalAddContacto').modal('close');
    $('#modalAddContactoADD').modal('open');
  }
  saveContactoADD = () => {
    console.log(this.modelContacto);
    let path = this.dominio + "/API/vLatamERP_db_dat/v1/ent_m?api_key=" + this.apiKey;
    let body = this.modelContacto;
    this.cargando = true; 
    this.http.post(path,body).then(res=>{
      this.cargando = false; 
      if(res.errors){
        Materialize.toast(res.errors,4000);
      } else {
        console.log(res);
        this.totales.nombre = res.ent_m[0].name;
        this.idCliente = res.ent_m[0].id;
        Materialize.toast("Agregado con exito",4000);
        $('#modalAddContactoADD').modal('close');
      }
    });
    
  }
  closeModal = (modal) => {
    $('#' + modal).modal('close');
  }
  fnBtnAdd = () => {
    $('#modalAddContacto').modal('open');
    setTimeout(()=>{
      $('input.autocomplete').autocomplete({
        data: this.contactos,
        limit: 4,
        onAutocomplete: function(val) {
         
        },
        minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
      });
      $('#contacto').val('');
    },500);
  }
  fnSearchVenta = () => {
    let en = this.btnSearch;
    if(en){
      this.btnSearch = false;
      setTimeout(()=>{
        $('#searchVenta').focus();
      },100);
    } else if(!en) {
      this.btnSearch = true;
    }
  }
  enterApikey = () => {
    if(this.apiKey != ''){
      this.getFamilias();
      $('#modalApiKey').modal('close');
      //localStorage.setItem("api_key",this.apiKey);
    }
  }
  addObservacion = (obj:Producto) => {
    this.prodSeleccionado = obj.id;
    this.observaciones = obj.observacion;
    $('#modalAddObservaciones').modal('open');
  }
  saveContacto = () => {
    let con = $('#contacto').val();
    this.totales.nombre = con;
    this.contactos.forEach(i => {
      if(con == i.name){
        this.idCliente = i.id;
      }
    });
    $('#modalAddContacto').modal('close');
  }
  saveObsevacion = (value?) => {
    console.log(this.observaciones)
    $('#modalAddObservaciones').modal('close');
    // this.venta.forEach((i,index)=>{
    //   if(this.prodSeleccionado == i.id){
    //     this.venta[index].observacion = this.observaciones;
    //     $('#modalAddObservaciones').modal('close');
        
    //   }
    // });
  }
  fnPush = () => {
    if(this.e){
      this.e = false;
    } else {
      this.e = true;
    }
  }
  fnSelectProd = (obj:Producto) => {
    let en:boolean = true;
    let producto:Producto = obj;
    this.venta.forEach((i,index) => {
      this.venta[index].select = false;
      if(i.id == producto.id){
        en = false;
        if(isNaN(this.venta[index].cantidad)){
          this.venta[index].cantidad = 1;
          this.venta[index].total = producto.pvp;
          en = false; 
        } else {
          this.venta[index].cantidad = Number(this.venta[index].cantidad) + 1;
          this.venta[index].total = producto.pvp * this.venta[index].cantidad;
          en = false;
        }
        en = false;
      }
    });
    if(en){
      en = false;
      producto.cantidad = 1;
      producto.total = producto.pvp;
      producto.select = false;
      this.venta.push(producto);
      let h = 123 * this.venta.length;
      $(".venta").animate({scrollTop:h}, 1000);
      en = false;
    }
    this.sumTotal();
  }
  
  calcularForPrice = (value,obj) => {
    this.venta.forEach((i,index) => {
      if(obj.id == i.id){
        i.pvp = value;
        i.total = i.cantidad * value;
      }
    });
    this.sumTotal();
  }
  calcularForCantidad = (value,obj) => {
    this.venta.forEach((i,index) => {
      if(obj.id == i.id){
        i.cantidad = value;
        i.total = i.pvp * value;
      }
    });
    this.sumTotal();
  }
  sumTotal = () => {
    let total = 0;
    this.venta.forEach((i,index)=>{
     total += (Number(i.total));
    });
    this.totales.total = total.toFixed(2);
    this.btnSearch = true;
  }
  fnSelectVenta = (obj:Producto) => {
    let id = obj.id;
    this.venta.forEach(i => {
      if(i.id == id){
        i.select = true;
      } else {
        i.select = false;
      }
    });

  }
  deleteProd = (obj:Producto) => {
    let id = obj.id;
    let en:boolean = false;
    if(this.venta.length == 1){
      this.totales = {total:0,Ticket:"0001", nombre:""};
      this.observaciones = '';
    }
    this.venta.forEach((i,index)=>{
      if(i.id == id){
        this.venta.splice(index,1);
        this.sumTotal();
        en = true;
      }
    });
    if(!en){
      Materialize.toast("Seleccione producto para anular",4000,"danger");
    }
  }
  deleteAllProd = () => {
    this.venta = [];
    this.totales = {total:0,Ticket:"0001", nombre:""};
    this.observaciones = '';
  }
  titulo:string = '';
  getProductos = (fam?:any) => {
    
    let path:string = this.dominio + "/API/vLatamERP_db_dat/v1/art_m?api_key=" + this.apiKey;
    this.cargando = true; 
    this.http.get(path).then(res => {
      let data:ResProductos = res;
      this.titulo = fam.name;
      this.productos = [];
      this.cargando = false; 
      //this.productos = res.art_m;
      //Materialize.toast("Bienvenido",4000);
      console.log(this.productos);
       res.art_m.forEach(i=>{
         if(i.fam == fam.id){
           this.productos.push(i);
         }
       })
       if(this.productos.length == 0){
         Materialize.toast("No se encontro articulos en " + fam.name,4000);
       }
      if(data.errors){
        Materialize.toast(data.errors,4000);
        $('#modalApiKey').modal('open');
      }
    });
  }
  getFamilias = () => {
    let path:string = this.dominio + "/API/vLatamERP_db_dat/v1/fam_m?api_key=" + this.apiKey;
    this.cargando = true; 
    this.http.get(path).then(res => {
      this.cargando = false; 
      let data:ResProductos = res;
      this.familias = res.fam_m;
      console.log(this.familias);
    })
  }
  getContactos = () => {
    let path:string = this.dominio + "/API/vLatamERP_db_dat/v1/ent_m?api_key=" + this.apiKey;
    this.http.get(path).then(res => {
      let data:any = res;
      this.contactos = res.ent_m;
      data.ent_m.forEach(i => {
        this.contactos[i.name] = null;
      });
     // console.log(data);
    })
  }

}
