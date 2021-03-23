import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { ResponseStatus } from '../model/response-status';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private userUrl: string = "http://localhost:2021/BakService/user/";
  private userUrl:string;

  constructor(private http: HttpClient, private appConstants: AppConstants) {
    this.userUrl = appConstants.BASE_URL + "user/"
   }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + "getUserList");
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.userUrl + "getUser/" + id);
  }

  getUserByUserId(userId: string): Observable<User> {
    return this.http.get<User>(this.userUrl + "getUserByUserId/" + userId);
  }

  addUser(user: User): Observable<ResponseStatus> {
    return this.http.post<ResponseStatus>(this.userUrl + "addUser", user);

  }

  updateUser(user: User): Observable<ResponseStatus> {
    return this.http.put<ResponseStatus>(this.userUrl + "updateUser", user);
  }

  deleteUser(id: number): Observable<ResponseStatus> {
    return this.http.delete<ResponseStatus>(this.userUrl + "deleteUser/" + id);
  }

  refreshUserList(): Observable<ResponseStatus> {
    return this.http.get<ResponseStatus>(this.userUrl + "refreshUserList");
  }

}
