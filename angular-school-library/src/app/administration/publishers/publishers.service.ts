import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPublisher } from '../../shared/models/publisher.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class PublishersService {
  private _baseUrl: string;

  constructor(private _http: HttpClient) {
    this._baseUrl = environment.baseUrl;
  }

  public getPublishers(): Observable<IPublisher[]> {
    return this._http.get<IPublisher[]>(`${this._baseUrl}/publishers`);
  }

  public getPublisher(publisherID): Observable<IPublisher> {
    return this._http.get<IPublisher>(`${this._baseUrl}/publishers/${publisherID}`);
  }

  public deletePublisher(publisherID: number): Observable<any> {
    return this._http.delete(`${this._baseUrl}/publishers/${publisherID}`);
  }

  public updatePublisher(publisher: IPublisher): Observable<any> {
    return this._http.post(`${this._baseUrl}/publishers`, publisher);
  }
}
