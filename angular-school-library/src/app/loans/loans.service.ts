import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ILoan } from './models/loan.model';

import { BookStatuses } from '../shared/models/book-statuses';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoansService {
  private _baseUrl: string;

  constructor(private _http: HttpClient) {
    this._baseUrl = environment.baseUrl;
  }

  public getLoans(): Observable<ILoan[]> {
    return this._http.get<ILoan[]>(`${this._baseUrl}/loans`);
  }

  public requestBook(bookID: number): Observable<any> {
    return this._http.post(`${this._baseUrl}/loans/request?bookID=${bookID}`, {});
  }

  public returnBook(userID: number, bookID: number): Observable<any> {
    return this._http.post(`${this._baseUrl}/loans/update/${userID}/${bookID}/${BookStatuses.Available}`, {});
  }

  public lendBook(userID: number, bookID: number): Observable<any> {
    return this._http.post(`${this._baseUrl}/loans/update/${userID}/${bookID}/${BookStatuses.Borrowed}`, {});
  }

  public setBookStatusToLost(userID: number, bookID: number): Observable<any> {
    return this._http.post(`${this._baseUrl}/loans/update/${userID}/${bookID}/${BookStatuses.Lost}`, {});
  }
}
