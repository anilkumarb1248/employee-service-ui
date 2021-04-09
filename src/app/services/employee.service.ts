import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { ResponseStatus } from '../model/response-status';
import { retry } from 'rxjs/operators';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private empUrl: string;

  constructor(private http: HttpClient, private appConstants: AppConstants) {
    this.empUrl = appConstants.BASE_URL + "employee/"
  }

  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.empUrl + "list");
  }

  /* If it fails first time, it will retry 3 times as mentioned in the pipe retry() method*/
  // getEmployeeList(): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(this.empUrl+"getEmployeeList")
  //                                     .pipe( retry(3));
  // }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.empUrl + "get/" + id);
  }

  addEmployee(employee: Employee): Observable<ResponseStatus> {
    return this.http.post<ResponseStatus>(this.empUrl + "add", employee);

  }

  updateEmployee(employee: Employee): Observable<ResponseStatus> {
    return this.http.put<ResponseStatus>(this.empUrl + "update", employee);
  }

  deleteEmployee(id: number): Observable<ResponseStatus> {
    return this.http.delete<ResponseStatus>(this.empUrl + "delete/" + id);
  }

}
