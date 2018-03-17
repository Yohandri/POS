import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'all'
})
export class AllPipe implements PipeTransform {

  transform(value: any, args?: string): any {
    if (!value || !args) {
      return value;
  }
    return value.filter(item => item.name.toLowerCase().indexOf(args.toLowerCase()) !== -1);
  }

}

@Pipe({
  name: 'myfilter',
  pure: false
})
export class MyFilterPipe implements PipeTransform {
  transform(items: any[], filter: Object): any {
      if (!items || !filter) {
          return items;
      }
      // filter items array, items which match and return true will be
      // kept, false will be filtered out
      return items.filter(item => item.title.indexOf(filter) !== -1);
  }
}