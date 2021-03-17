import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../model/employee';

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  transform(employee: Employee): string {
    const firstName = employee.firstName;
    const middleName = employee.middleName;
    const lastName = employee.lastName;

    let fullName = "";
    if (firstName) {
      fullName = firstName;
    }
    if (middleName) {
      fullName = fullName + " " + middleName;
    }
    if (lastName) {
      fullName = fullName + " " + lastName;
    }
    return fullName;
  }

}

