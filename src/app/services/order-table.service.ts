import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderTableService {

  
  private apiUrl = '/api/order/'
  // private memberId = environment.memberId;
  

  constructor(private http:HttpClient) { }

 create(memberId:string, orderData:any):Observable<any> {
  const headers = new HttpHeaders( { 'Content-Type': 'application/json' } );
  return this.http.post<any>(`/api/batch?memberId=${memberId}`,orderData,{headers : headers});
 } 

 createFast(memberId:string, orderData:any):Observable<any> {
  const headers = new HttpHeaders( { 'Content-Type': 'application/json' } );
  return this.http.post<any>(`/api/order?memberId=${memberId}`,orderData,{headers : headers});
 }


 findAllToday(memberId:string):Observable<any[]> {
  const params = new HttpParams().set('memberId', memberId);
   return this.http.get<any[]>(`/api/order`,{params})
 }

 findAll(memberId:string):Observable<any[]> {
  const params = new HttpParams().set('memberId', memberId);
   return this.http.get<any[]>(`/api/order/findAll`,{params})
 }

 findById(id:number, memberId:string):Observable<any> {
  let params = new HttpParams()
     .set('id',id.toString())
    .set('memberId',memberId)
   return this.http.get<any>('api/order/findById',{ params });
 }

 findByCarId(carId:number, memberId:string):Observable<any> {
  let params = new HttpParams()
     .set('carId',carId.toString())
    .set('memberId',memberId)
   return this.http.get<any>('api/order/findByCarId',{ params });
 }
 findByCustomerId(customerId:number, memberId:string):Observable<any> {
  let params = new HttpParams()
     .set('customerId',customerId.toString())
    .set('memberId',memberId)
   return this.http.get<any>('api/order/findByCustomerId',{ params });
 }

  updateOrder(id:number ,orderData:any):Observable<any> {
    const headers = new HttpHeaders( { 'Content-Type': 'application/json' } );
    return this.http.patch<any>(`/api/order/${id}`,orderData, {headers : headers});
  }

  deleteOrder(id:number):Observable<any> {
    return this.http.delete<any>(`/api/order/${id}`);
  }
}
