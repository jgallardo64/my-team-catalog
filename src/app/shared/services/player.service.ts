import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class PlayerService {
  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Players`)
      .pipe(map((data: any[]) => data));
  }

  public createPlayer(values: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + `Players`, values)
      .pipe(map((data: any[]) => data));
  }

  public getById(playerId: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Players/${playerId}`)
      .pipe(map((data: any[]) => data));
  }
}
