import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConstants {
    BASE_URL: string  = "http://localhost:2021/EmployeeManagement/";
    AUTHENTICATION_TYPE:string = "JWT_Token";
}
