import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConstants } from '../app-constants';
import { SessionDetails } from '../common/session/session-details';
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
    this.loginUrl = this.appConstants.BASE_URL;
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

  authenticateUserByLoginController(loginUser: LoginUser): Observable<ResponseStatus> {
    return this.http.post<ResponseStatus>(this.loginUrl + "login", loginUser);
  }

  authenticateUserByJWT(loginUser: LoginUser): Observable<any> {
    this.loginUrl = this.appConstants.BASE_URL + "authenticate"
    let userDetails = {
      username: loginUser.userName,
      password: loginUser.password
    }
    return this.http.post<any>(this.loginUrl, userDetails);
  }

  // Session Details
  setSessionData(token: string, loggedInUserData: User, keepLogin: boolean) {
    let sd = sessionStorage.getItem("sessionDetails");
    let sessionDetails;
    if (!sd) {
      sessionDetails = new SessionDetails();
    } else {
      sessionDetails = JSON.parse(sd);
    }

    if (loggedInUserData) {
      sessionDetails.loggedInUserData = loggedInUserData;
    }

    if (token) {
      sessionDetails.token = token;
    }
    if (keepLogin) {
      sessionDetails.keepLogin = keepLogin;
    }

    sessionStorage.setItem("sessionDetails", JSON.stringify(sessionDetails));
  }

  getSessionData(): SessionDetails {
    let sd = sessionStorage.getItem("sessionDetails");
    return sd ? JSON.parse(sd) : {};
    // if(!sd){
    //   return new SessionDetails();
    // }
    // return JSON.parse(sd);
  }

  clearSession() {
    sessionStorage.setItem("sessionDetails", "");
  }
}
