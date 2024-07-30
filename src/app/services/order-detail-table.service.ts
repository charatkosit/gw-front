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

 create(memberId:string,orderDetailData:any):Observable<any> {
  const headers = new HttpHeaders( { 'Content-Type': 'application/json' } );
  return this.http.post<any>(`/api/order-detail?memberId=${memberId}`,orderDetailData,{headers : headers});
 } 

 getOrderDetailById(orderdetailId:number):Observable<any> {
  let params = new HttpParams()
     .set('orderdetailId',orderdetailId.toString())
    .set('memberId',this.memberId)
   return this.http.get<any>('api/order-detail/findById',{ params });
 }


 getOrderDetailByOrderId(orderId:number):Observable<any> {
  let params = new HttpParams()
     .set('orderId',orderId.toString())
    .set('memberId',this.memberId)
   return this.http.get<any>('api/order-detail',{ params });
 }

  update(id:number ,orderDetailData:any):Observable<any> {
    const headers = new HttpHeaders( { 'Content-Type': 'application/json' } );
    return this.http.patch<any>(`/api/order-detail/${id}`,orderDetailData, {headers : headers});
  }

  delete(id:number):Observable<any> {
    return this.http.delete<any>(`/api/order-detail/${id}`);
  }
}
