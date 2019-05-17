import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class BadgeService {
  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Badges`)
      .pipe(map((data: any[]) => data));
  }

  public getById(badgeId: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Badges/${badgeId}`)
      .pipe(map((data: any[]) => data));
  }
}
