import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../animations/animations';
import { HttpService } from "../service/http.service";
import { Producto, ResProductos, Familia } from "../interface/all-interfaces";
declare var Materialize:any;
declare var $:any;
declare var Dominio;
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
      $('#modalApiKey').modal('open');
      
    },500);
      //this.getFamilias();
      //this.getContactos();
   }

  ngOnInit() {
  }
  e:boolean = false;
  productos:Producto[] = [];
  venta:Producto[] = [];
  search:string = "";
  searchFam:string = "";
  familias:any = [];
  apiKey:string = 'api1234';
  totales:any = {total:0,Ticket:"0001", nombre:"",id:0};
  prodSeleccionado:any = 0;
  observaciones:string = '';
  btnSearch:boolean = true;
  contactos:any = [];
  dominio:string = Dominio;
  modelContacto:any = {id:0,name:"",es_clt:true,cif:"",cmr:"",mon_c:"",NOM_COM:"",NOM_FIS:"",tlf:"",eml:"",dir:""};
  cargando:boolean = false;
  idCliente:number = 0;
  searchVenta:string = '';
  contacto:string = '';
  traerVentaField:string = '';
  cltVentas:any = [];
  showAuto:boolean = false;
  creadoPor:string = "Creado por Yohandri Ramírez Email:YoHa3001@gmail.com 21/03/2018";
  selectVenta = (venta:any) => {
    let path = this.dominio + "/API/vLatamERP_db_dat/v1/fac_apa_lin_t?api_key=" + this.apiKey;
    this.cargando = true;
    this.venta = [];
    this.totales.total = 0;
    this.http.get(path).then(res => {
      this.cargando = false;
      let data = res.fac_apa_lin_t;
      console.log(data);
      data.forEach(i => {
        if(venta.id == i.fac_apa){
          //console.log(i);
          i.total = i.pre_net;
          i.pvp = i.pre;
          i.cantidad = i.can;
          this.venta.push(i);
        }
      });
      if(this.venta.length == 0){
        Materialize.toast("No se encontro productos",4000);
      }
      this.contactos.forEach(i => {
        if(this.idCliente == i.id){
          this.totales.nombre = i.name;
        }
      });
      this.sumTotal();
      this.closeModal('modalTraerVenta');
    });
  }
  pressKey = () => {
    this.showAuto = true;
  }
  blur = () => {
    setTimeout(()=>{
      this.showAuto = false;
    },1000)
  }
  selectContacto = (obj:any) => {
    this.traerVentaField = obj.name;
    this.contacto = obj.name;
    this.idCliente = obj.id;
    this.contactoSelect = obj.name;
    console.log(this.traerVentaField);
    setTimeout(()=>{
      Materialize.updateTextFields();
    },1000);
  }
  traerVenta = () => {
    let con = this.idCliente;
    //console.log(this.traerVentaField);
    let path = this.dominio + "/API/vLatamERP_db_dat/v1/fac_apa_t?api_key=" + this.apiKey;
    this.contactos.forEach(i => {
      if(con == i.id){
        this.idCliente = i.id;
        this.cargando = true;
        this.http.get(path).then(res =>{
          this.cargando = false;
          let data = res.fac_apa_t;
          data.forEach(i => {
            if(this.idCliente == i.clt){
              this.observaciones = i.obs;
              this.totales.id = i.id;
              this.cltVentas.push(i);
            }
          });
          //console.log(this.cltVentas)
          if(this.cltVentas.length == 0){
            Materialize.toast("No se encontraron ventas",4000);
          }
        });
      }
    });
    //this.closeModal('modalTraerVenta');
  }
  fnTraerVenta = () => {
    //this.getContactos();
    this.traerVentaField = '';
    this.cltVentas = [];
    this.openModal('modalTraerVenta');
    let self = this;
      setTimeout(()=>{
        $('input.autocomplete').autocomplete({
          data: self.contactos,
          limit: 20,
          onAutocomplete: function(val) {
           //console.log(val);
           self.contactoSelect = val;
           self.traerVentaField = val;
          },
          minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
        });
      },500);
  }
  guardarFactura = () => {
    let fecha = new Date().toISOString();
    let hora = new Date(fecha).toISOString();
    let id = this.totales.id;
    let body:any = {
      "id": id,
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
      "API_KEY": this.apiKey
    };
    //console.log(body);
    let path = this.dominio + "/API/vLatamERP_db_dat/v1/fac_apa_t?api_key=" + this.apiKey;
    if(id != 0){
      path = this.dominio + "/API/vLatamERP_db_dat/v1/fac_apa_t/"+ id +"?api_key=" + this.apiKey;
    }
    //console.log(path);
    this.cargando = true;    
    this.http.post(path,body).then(res => {
      let data = res.fac_apa_t;
      //console.log(res);
      this.cargando = false;
      if(data.length == 0){
        Materialize.toast("Error al guardar",4000);
      } else {
        Materialize.toast("Guardado con exito",4000);
        this.closeModal('modalGuardar');
        this.venta.forEach((i,index)=>{
          this.guardarLineas(data[0].id,i);
        });
      }
      
    });
    
  }
  guardarLineas = (id:number, articulo:any) => {
    //console.log(articulo.id);
    let idArticulo = 0
    if(articulo.id == undefined){
      idArticulo = 0;
    } else {
      idArticulo = articulo.id;
    }
    let body:any = {
      "id": idArticulo,
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
    if(idArticulo != 0){
      path = this.dominio + "/API/vLatamERP_db_dat/v1/fac_apa_lin_t/"+ idArticulo +"?api_key=" + this.apiKey;
    }
    //console.log(path);
    this.cargando = true; 
    this.http.post(path,body).then(res => {
      this.cargando = false;
      this.venta = [];
      this.totales = {total:0,Ticket:"0001", nombre:"",id:0};
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
    //console.log(this.modelContacto);
    let path = this.dominio + "/API/vLatamERP_db_dat/v1/ent_m?api_key=" + this.apiKey;
    let body = this.modelContacto;
    //body.NOM_COM = body.name;
    //body.NOM_FIS = body.name;
    this.cargando = true; 
    this.http.post(path,body).then(res=>{
      this.cargando = false; 
      if(res.errors){
        Materialize.toast(res.errors,4000);
      } else {
        //console.log(res);
        this.getContactos();
        this.totales.nombre = body.NOM_COM;
        this.idCliente = res.ent_m[0].id;
        Materialize.toast("Agregado con exito",4000);
        $('#modalAddContactoADD').modal('close');
      }
    });
    
  }
  closeModal = (modal) => {
    $('#' + modal).modal('close');
  }
  openModal = (modal) => {
    $('#' + modal).modal('open');
  }
  fnBtnAdd = () => {
    //this.getContactos();
    $('#modalAddContacto').modal('open');
    let self = this;
    setTimeout(()=>{
      $('input.autocomplete').autocomplete({
        data: this.contactos,
        limit: 20,
        onAutocomplete: function(val) {
         //console.log(val);
         self.contactoSelect = val;
         self.traerVentaField = val;
        },
        minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
      });
      $('#contacto').val('');
    },1000);
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
      this.getContactos();
      $('#modalApiKey').modal('close');
      //localStorage.setItem("api_key",this.apiKey);
    }
  }
  addObservacion = (obj:Producto) => {
    this.prodSeleccionado = obj.id;
    this.observaciones = obj.observacion;
    $('#modalAddObservaciones').modal('open');
  }
  contactoSelect:string = '';
  saveContacto = () => {
    //let con = $('#contacto').val();
    let con = this.idCliente;
    
    this.totales.nombre = con;
    this.contactos.forEach(i => {
      if(con == i.id){
        this.idCliente = i.id;
      }
    });
    $('#modalAddContacto').modal('close');
    if(this.contactoSelect == ''){
      Materialize.toast("Seleccione un contacto o agregue uno nuevo",5000);
    }
  }
  saveObsevacion = (value?) => {
    //console.log(this.observaciones)
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
      this.totales = {total:0,Ticket:"0001", nombre:"",id:0};
      this.observaciones = '';
      this.contactoSelect = '';
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
    this.totales = {total:0,Ticket:"0001", nombre:"",id:0};
    this.observaciones = '';
    this.contactoSelect = '';
  }
  titulo:string = '';
  presskey = () => {
    this.searchFam = '';
    $('.menu-item').removeClass('active');
    $('.menu-item-mobile').removeClass('active');
    $('.menu-item-mobile a').removeClass('active');
    $('.menu').removeClass('active');
    this.titulo = 'Todos';
    $('.fnTodo').addClass('active');
  }
  getProductos = (fam?:any) => {
    
    let path:string = this.dominio + "/API/vLatamERP_db_dat/v1/art_m?api_key=" + this.apiKey;
    this.cargando = true; 
    this.http.get(path).then(res => {
      let data:ResProductos = res;
      this.titulo = 'Todos';
      this.productos = [];
      this.cargando = false; 
      this.productos = res.art_m;
      
      this.productos.forEach(element => {
        if(element.img != ''){
          console.log(this.productos);
        }
      });
      //Materialize.toast("Bienvenido",4000);
      //  res.art_m.forEach(i=>{
      //    if(i.fam == fam.id){
      //      this.productos.push(i);
      //    }
      //  });
      // console.log(this.productos);
       if(this.productos.length == 0){
         Materialize.toast("No se encontro articulos en " + fam.name,4000);
       }
      if(data.errors){
        Materialize.toast(data.errors,4000);
        $('#modalApiKey').modal('open');
      }
    });
  }
  fnTodo = () => {
    $('.menu-item').removeClass('active');
    $('.menu').removeClass('active');
    $('.menu-item-mobile').removeClass('active');
    $('.menu-item-mobile a').removeClass('active');
    $('.fnTodo').addClass('active');
    this.searchFam = '';
  }
  fnFamilia = (obj:any,e) => {
    //this.getProductos(obj);
    $('.menu-item').removeClass('active');
    $('.menu').removeClass('active');
    $('.menu-item-mobile').removeClass('active');
    $('.menu-item-mobile a').removeClass('active');
    this.titulo = obj.name;
    this.search = '';
    this.searchFam = obj.id;
    let target = e.path[0];
    let target2 = e.path[1];
    $(target).addClass("active");
    $(target2).addClass("active");
  }
  getFamilias = () => {
    let path:string = this.dominio + "/API/vLatamERP_db_dat/v1/fam_m?api_key=" + this.apiKey;
    this.cargando = true; 
    this.http.get(path).then(res => {
      this.cargando = false;
      if(res.errors){
        Materialize.toast(res.errors[0],4000);
        this.openModal("modalApiKey");
      } else {
      this.cargando = false; 
      let data:ResProductos = res;
      this.familias = res.fam_m;
      let f = this.familias[0];
      setTimeout(()=>{
        //$('li.menu-item:first').addClass('active');
      },1000);
      this.getProductos(f);
    }
    })
  }
  contactosAutocomplete:any;
  getContactos = () => {
    let path:string = this.dominio + "/API/vLatamERP_db_dat/v1/ent_m?api_key=" + this.apiKey;
    this.cargando = true;
    console.log(path);
    this.http.get(path).then(res => {
    this.cargando = false;      
      if(res.errors){
        Materialize.toast(res.errors[0],4000);
        this.openModal("modalApiKey");
      } else {
      let data:any = res;
      data.ent_m.forEach(i => {
          this.contactos.push(i);
        });
      
      if(data.total_count >= this.contactos.length){
        //this.getContactos();
      }
      //this.contactos = res.ent_m;
      
     console.log(data,this.contactos);
     this.cargando = false;
      let self = this;
      setTimeout(()=>{
        $('input.autocomplete').autocomplete({
          data: self.contactos,
          limit: 20,
          onAutocomplete: function(val) {
           //console.log(val);
           self.contactoSelect = val;
           self.traerVentaField = val;
          },
          minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
        });
      },500);
 
      }    })
  }

}
