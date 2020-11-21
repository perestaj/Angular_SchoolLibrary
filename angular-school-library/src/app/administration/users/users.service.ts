import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from './models/user.model';

import { IUserRole } from './models/user-role.model';
import { IUserUpdateResult } from './models/user-update-result.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  public getRoles(): Observable<IUserRole[]> {
    return this.http.get<IUserRole[]>(`${this.baseUrl}/users/roles`);
  }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}/users`);
  }

  public getUser(userID): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/users/${userID}`);
  }

  public deleteUser(userID: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${userID}`);
  }

  public updateUser(user: IUser): Observable<IUserUpdateResult> {
    return this.http.post<IUserUpdateResult>(`${this.baseUrl}/users`, user);
  }
}
