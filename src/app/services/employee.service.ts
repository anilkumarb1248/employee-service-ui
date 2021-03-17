import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { ResponseStatus } from '../model/response-status';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl: string = "http://localhost:2021/BakService/employee/";
  constructor(private http:HttpClient) { }

  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl+"getEmployeeList");
  }

  getEmployee(id:number):Observable<Employee>{
    return this.http.get<Employee>(this.baseUrl+"getEmployee/"+id);
  }

  addEmployee(employee:Employee):Observable<ResponseStatus>{
    return this.http.post<ResponseStatus>(this.baseUrl+"addEmployee",employee);

  }

  updateEmployee(employee:Employee):Observable<ResponseStatus>{
    return this.http.put<ResponseStatus>(this.baseUrl+"updateEmployee",employee);
  }

  deleteEmployee(id:number):Observable<ResponseStatus>{
    return this.http.delete<ResponseStatus>(this.baseUrl+"deleteEmployee/"+id);
  }

  refreshEmployeeList():Observable<ResponseStatus>{
    return this.http.get<ResponseStatus>(this.baseUrl+"refreshEmployeeList");
  }

}
