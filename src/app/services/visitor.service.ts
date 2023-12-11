import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  private apiUrl = 'http://localhost:3000/api/visitors/'

  constructor(private http:HttpClient) { }

  getData():Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
  }

  getCount():Observable<any>{
    return this.http.get<any>('http://localhost:3000/api/visitors/count')
   }
}
