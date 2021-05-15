import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let sd = sessionStorage.getItem("sessionDetails");
    if (sd) {
      let sessionDetails = JSON.parse(sd);
      if (sessionDetails.token) {
        // request = request.clone({
        //   setHeaders: {
        //     Authorization: sessionStorage.getItem('token')

        //   }
        // });
        request = request.clone({ headers: request.headers.set("Authorization", sessionDetails.token) });
      }
    }

    return next.handle(request);
  }
}

    // const authRequest = request.clone({
    //   setHeaders: { 
    //     "Authorization": `${authToken}`,
    //     'Cookies' : "JSESSIONID="+sessionId,
    //     "Access-Control-Allow-Origin":"http://localhost:4200",
    //     "Access-Control-Allow-Credentials": "true",
    //     "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
    //     "Access-Control-Max-Age": "3600",
    //     "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Range, Content-Disposition, Content-Type, Authorization, X-CSRF-TOKEN"
    //  },
    // });
