import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IBook } from './models/book.model';
import { IBookStatus } from '../loans/models/book-status.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class BooksService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  public getBookStatuses(): Observable<IBookStatus[]> {
    return this.http.get<IBookStatus[]>(`${this.baseUrl}/books/statuses`);
  }

  public getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${this.baseUrl}/books`);
  }

  public getBook(bookID): Observable<IBook> {
    return this.http.get<IBook>(`${this.baseUrl}/books/${bookID}`);
  }

  public deleteBook(bookID: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/books/${bookID}`);
  }

  public updateBook(book: IBook): Observable<any> {
    return this.http.post(`${this.baseUrl}/books`, book);
  }
}
