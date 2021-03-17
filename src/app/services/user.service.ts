import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseStatus } from '../model/response-status';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = "http://localhost:2021/BakService/user/";
  constructor(private http: HttpClient) { }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + "getUserList");
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + "getUser/" + id);
  }

  getUserByUserId(userId: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + "getUserByUserId/" + userId);
  }

  addUser(user: User): Observable<ResponseStatus> {
    return this.http.post<ResponseStatus>(this.baseUrl + "addUser", user);

  }

  updateUser(user: User): Observable<ResponseStatus> {
    return this.http.put<ResponseStatus>(this.baseUrl + "updateUser", user);
  }

  deleteUser(id: number): Observable<ResponseStatus> {
    return this.http.delete<ResponseStatus>(this.baseUrl + "deleteUser/" + id);
  }

  refreshUserList(): Observable<ResponseStatus> {
    return this.http.get<ResponseStatus>(this.baseUrl + "refreshUserList");
  }

}
