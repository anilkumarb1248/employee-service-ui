import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { LoginUser } from '../model/login-user';
import { ResponseStatus } from '../model/response-status';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedInUser: User;
  userLoggedIn: boolean = false;
  userLoggedInObservable: Observable<boolean>;

  // private baseUrl: string = "http://localhost:2021/BakService/login/";
  private loginUrl: string;

  constructor(private http: HttpClient, private appConstants: AppConstants) {
    this.loginUrl = appConstants.BASE_URL + "login/"
  }

  setLoggedInUser(user: User): void {
    this.loggedInUser = user;
    if(user){
      this.userLoggedIn = true;
    }else{
      this.userLoggedIn = false;
    }
  }

  getLoggedInUser(): User {
    return this.loggedInUser;
  }

  isUserLoggedIn(): boolean {
    return this.userLoggedIn;
  }

  isUserLoggedInObservable(): Observable<boolean> {
    this.userLoggedInObservable = new Observable(observer => {
      setInterval(() => {
        observer.next(this.userLoggedIn);
      }, 1000);
    });
    return this.userLoggedInObservable;
  }

  authenticateUser(loginUser: LoginUser): Observable<ResponseStatus> {
    return this.http.post<ResponseStatus>(this.loginUrl + "authenticate", loginUser);

  }
}
