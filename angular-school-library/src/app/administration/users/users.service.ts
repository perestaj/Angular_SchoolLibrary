import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from './models/user.model';

import { IUserRole } from './models/user-role.model';
import { IUserUpdateResult } from './models/user-update-result.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersService {
  private _baseUrl: string;

  constructor(private _http: HttpClient) {
    this._baseUrl = environment.baseUrl;
  }

  public getRoles(): Observable<IUserRole[]> {
    return this._http.get<IUserRole[]>(`${this._baseUrl}/users/roles`);
  }

  public getUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>(`${this._baseUrl}/users`);
  }

  public getUser(userID): Observable<IUser> {
    return this._http.get<IUser>(`${this._baseUrl}/users/${userID}`);
  }

  public deleteUser(userID: number): Observable<any> {
    return this._http.delete(`${this._baseUrl}/users/${userID}`);
  }

  public updateUser(user: IUser): Observable<IUserUpdateResult> {
    return this._http.post<IUserUpdateResult>(`${this._baseUrl}/users`, user);
  }
}
