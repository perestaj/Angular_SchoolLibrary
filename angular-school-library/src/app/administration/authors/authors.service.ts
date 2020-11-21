import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAuthor } from '../../shared/models/author.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthorsService {
  private _baseUrl: string;

  constructor(private _http: HttpClient) {
    this._baseUrl = environment.baseUrl;
  }

  public getAuthors(): Observable<IAuthor[]> {
    return this._http.get<IAuthor[]>(`${this._baseUrl}/authors`);
  }

  public getAuthor(authorID): Observable<IAuthor> {
    return this._http.get<IAuthor>(`${this._baseUrl}/authors/${authorID}`);
  }

  public deleteAuthor(authorID: number): Observable<any> {
    return this._http.delete(`${this._baseUrl}/authors/${authorID}`);
  }

  public updateAuthor(author: IAuthor): Observable<any> {
    return this._http.post(`${this._baseUrl}/authors`, author);
  }
}
