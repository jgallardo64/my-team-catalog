import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class TeamService {
  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Teams`)
      .pipe(map((data: any[]) => data));
  }

  public getById(teamId: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Teams/${teamId}`)
      .pipe(map((data: any[]) => data));
  }
}
