import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAuthor } from '../../shared/models/author.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthorsService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  public getAuthors(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(`${this.baseUrl}/authors`);
  }

  public getAuthor(authorID): Observable<IAuthor> {
    return this.http.get<IAuthor>(`${this.baseUrl}/authors/${authorID}`);
  }

  public deleteAuthor(authorID: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/authors/${authorID}`);
  }

  public updateAuthor(author: IAuthor): Observable<any> {
    return this.http.post(`${this.baseUrl}/authors`, author);
  }
}
