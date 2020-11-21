import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ILoan } from './models/loan.model';

import { BookStatuses } from '../shared/models/book-statuses';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoansService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  public getLoans(): Observable<ILoan[]> {
    return this.http.get<ILoan[]>(`${this.baseUrl}/loans`);
  }

  public requestBook(bookID: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/loans/request?bookID=${bookID}`, {});
  }

  public returnBook(userID: number, bookID: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/loans/update/${userID}/${bookID}/${BookStatuses.Available}`, {});
  }

  public lendBook(userID: number, bookID: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/loans/update/${userID}/${bookID}/${BookStatuses.Borrowed}`, {});
  }

  public setBookStatusToLost(userID: number, bookID: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/loans/update/${userID}/${bookID}/${BookStatuses.Lost}`, {});
  }
}
