import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailTableService {

  private apiUrl = '/api/order-detail/'
  private memberId = environment.memberId;
  

  constructor(private http:HttpClient) { }

 createOrderDetail(orderDetailData:any):Observable<any> {
  const headers = new HttpHeaders( { 'Content-Type': 'application/json' } );
  return this.http.post<any>(`/api/order-detail?memberId=${this.memberId}`,orderDetailData,{headers : headers});
 } 

 getOrderDetailById(id:number):Observable<any> {
  let params = new HttpParams()
     .set('id',id.toString())
    .set('memberId',this.memberId)
   return this.http.get<any>('api/order-detail/findById',{ params });
 }

  updateOrderDetail(id:number ,orderDetailData:any):Observable<any> {
    const headers = new HttpHeaders( { 'Content-Type': 'application/json' } );
    return this.http.patch<any>(`/api/order-detail/${id}`,orderDetailData, {headers : headers});
  }

  deleteOrderDetail(id:number):Observable<any> {
    return this.http.delete<any>(`/api/order-detail/${id}`);
  }
}
