import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'all'
})
export class AllPipe implements PipeTransform {

  transform(value: any, args?: string): any {
    if (!value || !args) {
      return value;
  }
    return value.filter(item => {
      let searchName = item.name.toLowerCase().indexOf(args.toLowerCase());
      let searchRef = item.ref.toLowerCase().indexOf(args.toLowerCase());
      let searchCodigo = item.cod_bar.toLowerCase().indexOf(args.toLowerCase());
      let search:boolean = false;
      if(searchName !== -1){
        search = true;
      } else if(searchRef !== -1){
        search = true;
      } else if(searchCodigo !== -1){
        search = true;
      }
      return search;
    });
  }

}
@Pipe({
  name: 'fam'
})
export class FamPipe implements PipeTransform {

  transform(value: any, args?: string): any {
    if (!value || !args) {
      return value;
  }
    return value.filter(item => { 
      let en = item.fam.toLowerCase() == args.toLowerCase();
      if(en){
        return true;
      } else {
        return false;
      }
    });
  }

}

@Pipe({
  name: 'autocomplete'
})
export class AutoCompletePipe implements PipeTransform {

  transform(value: any, args?: string): any {
    if (!value || !args) {
      return value;
  }
    return value.filter(item => { 
      let en = item.name.toLowerCase().indexOf(args.toLowerCase()) !== -1;
      if(en){
        return true;
      } else {
        return false;
      }
    });
  }

}