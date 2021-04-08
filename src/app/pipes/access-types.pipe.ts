import { Pipe, PipeTransform } from '@angular/core';
import { AccessType } from '../model/user';

@Pipe({
  name: 'accessTypes'
})
export class AccessTypesPipe implements PipeTransform {

  transform(accessTypes: AccessType[]): string {
    let types = "";

    accessTypes.forEach((type, index) => {
      if (index == (accessTypes.length - 1)) {
        types = types + AccessType[type];
      } else {
        types = types + AccessType[type] + ", ";
      }
    })
    return types;
  }
  
}
