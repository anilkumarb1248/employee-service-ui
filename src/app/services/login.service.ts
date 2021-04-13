import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  private loginUrl: string;

  constructor(private http: HttpClient, private appConstants: AppConstants) {
    this.loginUrl = appConstants.BASE_URL + "login/"
  }

  setLoggedInUser(user: User): void {
    this.loggedInUser = user;
    if (user) {
      this.userLoggedIn = true;
    } else {
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

  authenticateUserUsingSpringSecurity(loginUser: LoginUser) {
    console.log("Successfully logged in");

    return this.http.post<ResponseStatus>(this.loginUrl + "authenticate", loginUser);
    // return this.http.post<ResponseStatus>("http://localhost:2021/EmployeeManagement/login/authenticate", loginUser);

    // let basicAuthToken = 'Basic ' + window.btoa(loginUser.userName + ":" + loginUser.password);

    // return this.http.post(`http://localhost:2021/EmployeeManagement/login/authenticate`,loginUser,
    // { headers: { authorization: basicAuthToken } }).pipe(map((res) => {
    //   console.log("Successfully logged in")
    //   // this.username = username;
    //   // this.password = password;
    //   // this.registerSuccessfulLogin(username, password);
    // }));
  }

}
