import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPublisher } from '../../shared/models/publisher.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class PublishersService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  public getPublishers(): Observable<IPublisher[]> {
    return this.http.get<IPublisher[]>(`${this.baseUrl}/publishers`);
  }

  public getPublisher(publisherID): Observable<IPublisher> {
    return this.http.get<IPublisher>(`${this.baseUrl}/publishers/${publisherID}`);
  }

  public deletePublisher(publisherID: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/publishers/${publisherID}`);
  }

  public updatePublisher(publisher: IPublisher): Observable<any> {
    return this.http.post(`${this.baseUrl}/publishers`, publisher);
  }
}
