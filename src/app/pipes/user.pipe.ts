import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userPipe'
})
export class UserPipe implements PipeTransform {

  transform(obj: any, ...args: unknown[]): unknown {
    if (obj && typeof obj === 'object') {
      return obj.name+' '+obj.lastName;
    }
    return '';
  }

}
