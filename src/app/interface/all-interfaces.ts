export interface AllInterfaces {
}
export interface Producto {
    id?:number,
    name?:string,
    img?:string,
    ref?:string,
    und_med_m?: string,
    pvp?:number,
    observacion:string,
    select?:boolean,
    cantidad?:number,
    total?:number
    fam:string
}
export interface ResProductos {
    api_key:string,
    art_m:Producto,
    count:number,
    total_count:number,
    errors

}
export interface Familia {
    id?:string,
    name?:string,
    img?:string
}