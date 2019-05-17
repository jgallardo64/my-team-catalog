import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class CollectionService {
  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Collections`)
      .pipe(map((data: any[]) => data));
  }

  public getSubCollectionsFromCollection(collectionId: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Collections/${collectionId}/subcollections`)
      .pipe(map((data: any[]) => data));
  }
}
