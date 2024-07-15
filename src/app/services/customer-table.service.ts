import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerTableService {

  
  private apiUrl = '/api/customer/'
  
  constructor(private http:HttpClient) { }

 create(customerData:any):Observable<any> {
  const headers = new HttpHeaders( { 'Content-Type': 'application/json' } );
  return this.http.post<any>(this.apiUrl,customerData,{headers : headers});
 } 

 findAll(memberId:string):Observable<any[]> {
  const params = new HttpParams().set('memberId', memberId);
   return this.http.get<any[]>('/api/customer/findAll',{params})
 }

 findById(id:number, memberId:string):Observable<any> {
  let params = new HttpParams()
     .set('id',id.toString())
    .set('memberId',memberId)
   return this.http.get<any>('api/customer/findById',{ params });
 }

  update(id:number ,customerData:any):Observable<any> {
    const headers = new HttpHeaders( { 'Content-Type': 'application/json' } );
    return this.http.patch<any>(`/api/customer/${id}`,customerData, {headers : headers});
  }

  delete(id:number):Observable<any> {
    return this.http.delete<any>(`/api/customer/${id}`);
  }
}
