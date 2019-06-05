import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class LineupService {
  constructor(private http: HttpClient) { }

  getById(lineupId: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Lineups/${lineupId}`)
      .pipe(map((data: any[]) => data));
  }

  create(values: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + `Lineups`, values)
      .pipe(map((data: any[]) => data));
  }

  edit(lineupId: string, values: any): Observable<any> {
    return this.http.put<any>(environment.apiUrl + `Lineups/${lineupId}`, values)
      .pipe(map((data: any[]) => data));
  }

  countLineups(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `/Lineups/count`)
      .pipe(map((data: any[]) => data));
  }

  public getOne(skipped: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `/Lineups?filter[skip]=${skipped}&filter[limit]=1`)
      .pipe(map((data: any[]) => data));
  }
}
