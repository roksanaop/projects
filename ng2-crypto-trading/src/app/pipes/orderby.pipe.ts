import { Pipe, PipeTransform } from '@angular/core';

@Pipe({  
  name: 'orderBy' 
})
export class OrderedByPipe implements PipeTransform {

  transform(data: any[], args?: any): any {
    return data.sort((a, b) => {
      if (a[args.column] < b[args.column]) {
        return -args.direction;
      }
      if (a[args.column] > b[args.column]) {
        return args.direction;
      }
      return 0;
    });
  }
}