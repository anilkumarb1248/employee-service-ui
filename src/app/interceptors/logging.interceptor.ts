import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loggedInUser = this.loginService.getLoggedInUser();
    const userName = loggedInUser?loggedInUser.userName:"";
    console.log("Request made to URL: " + request.url + ' by ' + userName);
    
    return next.handle(request);
  }
}
