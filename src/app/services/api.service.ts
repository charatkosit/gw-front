import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }
  
  getPartlistByKeyword(keyword: string) {
    const uri = `api/v1/products/pagination?${keyword}`
    return this.http.get<any>(uri, { responseType: 'json' })
  }
}
