import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ClientService {
  constructor(private http: HttpClient) { }

  register(values: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + `Clients`, values)
      .pipe(map((data: any[]) => data));
  }


  getMyLineups(clientId: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Clients/${clientId}/lineups`)
      .pipe(map((data: any[]) => data));
  }
}
