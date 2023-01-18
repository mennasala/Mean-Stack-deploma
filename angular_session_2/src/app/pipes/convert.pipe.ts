import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convert',
})
export class ConvertPipe implements PipeTransform {
  transform(value: String, ...args: any[]): String {
    return value.replace('MennaTullah', args[1]);
  }
}
