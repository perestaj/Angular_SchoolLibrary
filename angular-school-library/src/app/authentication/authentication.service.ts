import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ICurrentUser } from '../administration/users/models/current-user.model';
import { ILogin } from './login/login.model';
import * as roles from './roles';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const AUTHORIZATION_DATA_LOCAL_STORAGE_KEY = 'AUTHORIZATION_DATA';

@Injectable()
export class AuthenticationService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  public authorizeFromLocalStorage(): ICurrentUser {
    const data = localStorage.getItem(AUTHORIZATION_DATA_LOCAL_STORAGE_KEY);

    return !!data && data.length > 0 && JSON.parse(data) as ICurrentUser;
  }

  public login(loginData: ILogin): Observable<ICurrentUser> {
    return this.http.post<ICurrentUser>(
      `${this.baseUrl}/users/token?userName=${loginData.username}&password=${loginData.password}`, null)
      .pipe(
        tap((response: ICurrentUser) => {
            localStorage.setItem(AUTHORIZATION_DATA_LOCAL_STORAGE_KEY, JSON.stringify(response));
        })
      );
  }

  public logOff(): void {
    localStorage.removeItem(AUTHORIZATION_DATA_LOCAL_STORAGE_KEY);
  }

  public canAddBook(currentUser: ICurrentUser): boolean {
    return currentUser && (currentUser.role === roles.LIBRARIAN || currentUser.role === roles.ADMINISTRATOR);
  }

  public canEditBook(currentUser: ICurrentUser): boolean {
    return currentUser && (currentUser.role === roles.LIBRARIAN || currentUser.role === roles.ADMINISTRATOR);
  }

  public canDeleteBook(currentUser: ICurrentUser): boolean {
    return currentUser && (currentUser.role === roles.LIBRARIAN || currentUser.role === roles.ADMINISTRATOR);
  }

  public canRequestBook(currentUser: ICurrentUser): boolean {
    return !!currentUser;
  }

  public canDisplayLoans(currentUser: ICurrentUser): boolean {
    return currentUser && (currentUser.role === roles.LIBRARIAN || currentUser.role === roles.ADMINISTRATOR);
  }

  public canEditLoans(currentUser: ICurrentUser): boolean {
    return currentUser && (currentUser.role === roles.LIBRARIAN || currentUser.role === roles.ADMINISTRATOR);
  }

  public displayAdministrationLink(currentUser: ICurrentUser): boolean {
    return this.canEditAuthors(currentUser) || this.canEditPublishers(currentUser) || this.canEditUsers(currentUser);
  }

  public canDisplayAuthors(currentUser: ICurrentUser): boolean {
    return currentUser && (currentUser.role === roles.LIBRARIAN || currentUser.role === roles.ADMINISTRATOR);
  }

  public canEditAuthors(currentUser: ICurrentUser): boolean {
    return currentUser && (currentUser.role === roles.LIBRARIAN || currentUser.role === roles.ADMINISTRATOR);
  }

  public canDisplayPublishers(currentUser: ICurrentUser): boolean {
    return currentUser && (currentUser.role === roles.LIBRARIAN || currentUser.role === roles.ADMINISTRATOR);
  }

  public canEditPublishers(currentUser: ICurrentUser): boolean {
    return currentUser && (currentUser.role === roles.LIBRARIAN || currentUser.role === roles.ADMINISTRATOR);
  }

  public canDisplayUsers(currentUser: ICurrentUser): boolean {
    return currentUser && currentUser.role === roles.ADMINISTRATOR;
  }

  public canEditUsers(currentUser: ICurrentUser): boolean {
    return currentUser && currentUser.role === roles.ADMINISTRATOR;
  }
}
