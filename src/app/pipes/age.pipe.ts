import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: Date): number {
    let currentDate:Date = new Date();
    let dob = new Date(value);
    let age = currentDate.getFullYear() - dob.getFullYear();
    return age;
  }

}
