import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class SubcollectionService {
  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Subcollections`)
      .pipe(map((data: any[]) => data));
  }

  public getById(subcollectionId: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Subcollections/${subcollectionId}`)
      .pipe(map((data: any[]) => data));
  }
}
