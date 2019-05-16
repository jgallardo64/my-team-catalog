import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class PlayerService {
  constructor(private http: HttpClient) {}

  public getAll(headers?: any): Observable<any> {
    return this.http
      .get<any>(environment.apiUrl + `Players`)
      .pipe(map((data: any[]) => data));
  }

  public createPlayer(values: any, headers?: any): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + `Players`, values)
      .pipe(map((data: any[]) => data));
  }

  public getById(playerId: any): Observable<any> {
    return this.http
      .get<any>(environment.apiUrl + `Players/${playerId}`)
      .pipe(map((data: any[]) => data));
  }
}
