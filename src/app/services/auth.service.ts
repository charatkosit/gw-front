import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  getBackRev() {
    return this.http.get<any>('api/auth/version', { responseType: 'json' })
  }

  // getAuthRev() {
  //   return this.http.get<any>('apiauth/auth/backRev', { responseType: 'json' })
  // }
}
