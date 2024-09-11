import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserStorageService } from '../storage/user-storage.service';
import { Observable } from 'rxjs';

const BASIC_URL = environment.NOMAD_ODYSSEY_API_URL;

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService
  ) { }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken() 
    );
  }

  getProductsByCategoryId(categoryId: number): Observable<any> {
    return this.http.get(BASIC_URL + `products/category/${categoryId}`, 
    {
      headers: this.createAuthorizationHeader()
    });
  }

}
