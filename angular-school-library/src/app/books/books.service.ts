import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IBook } from './models/book.model';
import { IBookStatus } from '../loans/models/book-status.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class BooksService {
  private _baseUrl: string;

  constructor(private _http: HttpClient) {
    this._baseUrl = environment.baseUrl;
  }

  public getBookStatuses(): Observable<IBookStatus[]> {
    return this._http.get<IBookStatus[]>(`${this._baseUrl}/books/statuses`);
  }

  public getBooks(): Observable<IBook[]> {
    return this._http.get<IBook[]>(`${this._baseUrl}/books`);
  }

  public getBook(bookID): Observable<IBook> {
    return this._http.get<IBook>(`${this._baseUrl}/books/${bookID}`);
  }

  public deleteBook(bookID: number): Observable<any> {
    return this._http.delete(`${this._baseUrl}/books/${bookID}`);
  }

  public updateBook(book: IBook): Observable<any> {
    return this._http.post(`${this._baseUrl}/books`, book);
  }
}
