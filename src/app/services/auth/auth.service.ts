import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';
import { environment } from '../../../environments/environment';

const BASIC_URL = environment.NOMAD_ODYSSEY_API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService
  ) { }

  register(signupRequest:any): Observable<any> {
    return this.http.post(BASIC_URL+"sign-up", signupRequest)
  }

  login(username:string, password:string): Observable<boolean> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {username, password};

    return this.http.post(BASIC_URL+"login", body, {headers, observe: 'response'}).pipe(
      map((res) => {
        const authorizationHeader = res.headers.get('Authorization');
        const token = authorizationHeader ? authorizationHeader.substring(7) : null;
        const user = res.body;
        if(token && user){
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(user);
          return true;
        }
        return false;
      })
    );
  }

  getOrderByTrackingId(trackingId: number): Observable<any> {
    return this.http.get(BASIC_URL + `order/${trackingId}`);
  }
}
