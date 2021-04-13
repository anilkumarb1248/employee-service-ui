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

  private userUrl:string;

  constructor(private http: HttpClient, private appConstants: AppConstants) {
    this.userUrl = appConstants.BASE_URL + "user/"
   }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + "list");
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.userUrl + "get/" + id);
  }

  getUserByUserName(userName: string): Observable<User> {
    return this.http.get<User>(this.userUrl + "getUserByUserName/" + userName);
  }


  addUser(user: User): Observable<ResponseStatus> {
    return this.http.post<ResponseStatus>(this.userUrl + "add", user);

  }

  updateUser(user: User): Observable<ResponseStatus> {
    return this.http.put<ResponseStatus>(this.userUrl + "update", user);
  }

  deleteUser(id: number): Observable<ResponseStatus> {
    return this.http.delete<ResponseStatus>(this.userUrl + "delete/" + id);
  }

  deleteUserByUserName(userName: string): Observable<ResponseStatus> {
    return this.http.delete<ResponseStatus>(this.userUrl + "deleteUserByUserName/" + userName);
  }

}
