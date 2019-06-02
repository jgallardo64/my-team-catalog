import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentClientSubject: BehaviorSubject<any>;
    public currentClient: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentClientSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentClient = this.currentClientSubject.asObservable();
    }

    getUser(): any {
        return this.currentClientSubject.value;
    }

    getUserRole(): any {
        return this.currentClientSubject.value.user.role;
    }

    login(values: any): Observable<any> {

        return this.http.post<any>(environment.apiUrl + `Clients/login?include=user`, values)
            .pipe(map((client: any) => {
                if (client && client.id) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(client));
                    this.currentClientSubject.next(client);
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentClientSubject.next(null);
    }
}