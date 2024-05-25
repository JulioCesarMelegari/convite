import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'like'
})
export class LikePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
