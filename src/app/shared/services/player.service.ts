import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class PlayerService {
  constructor(private http: HttpClient) { }

  public getAll(filterValues?: any): Observable<any> {
    if (!filterValues) {
      filterValues = '{"order": "overall DESC"}';
    }
    const httpOptions = {
      headers: new HttpHeaders({
        filter: filterValues
      })
    };
    return this.http.get<any>(environment.apiUrl + `Players`, httpOptions)
      .pipe(map((data: any[]) => data));
  }

  public createPlayer(values: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + `Players`, values)
      .pipe(map((data: any[]) => data));
  }

  public editPlayer(playerId: string, values: any): Observable<any> {
    return this.http.put<any>(environment.apiUrl + `Players/${playerId}`, values)
      .pipe(map((data: any[]) => data));
  }

  public deletePlayer(playerId: string): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + `Players/${playerId}`)
      .pipe(map((data: any[]) => data));
  }

  public getById(playerId: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Players/${playerId}`)
      .pipe(map((data: any[]) => data));
  }
}
