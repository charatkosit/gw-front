import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { carDataDto } from '../interfaces/carDataDto';

@Injectable({
  providedIn: 'root'
})
export class CarTableService {


  private apiUrl = '/api/car/'
  // private memberId = environment.memberId;
  

  constructor(private http:HttpClient) { }

 create(carData:carDataDto):Observable<any> {
  const headers = new HttpHeaders( { 'Content-Type': 'application/json' } );
  return this.http.post<any>(this.apiUrl,carData,{headers : headers});
 } 

 findAll(memberId:string):Observable<any[]> {
  const params = new HttpParams().set('memberId', memberId);
   return this.http.get<any[]>('/api/car/findAll',{params})
 }

 findById(carId:number, memberId:string):Observable<any> {
  let params = new HttpParams()
     .set('carId',carId.toString())
    .set('memberId',memberId)
   return this.http.get<any>('api/car/findById',{ params });
 }

 findByIdForHeader(carId:number, memberId:string):Observable<any> {
  let params = new HttpParams()
     .set('carId',carId.toString())
    .set('memberId',memberId)
   return this.http.get<any>('api/car/findByIdForHeader',{ params });
 }

 findCarsBycustomerId(customerId:number,memberId:string):Observable<any[]>{
  const params = new HttpParams()
     .set('customerId',customerId.toString())
     .set('memberId', memberId)

     console.log(`params : ${params}`)
  return this.http.get<any[]>('/api/car/findCarsByCustomerId',{ params })

 }
  update(id:number ,carData:any):Observable<any> {
    const headers = new HttpHeaders( { 'Content-Type': 'application/json' } );
    return this.http.patch<any>(`/api/car/${id}`,carData, {headers : headers});
  }

  delete(id:number):Observable<any> {
    return this.http.delete<any>(`/api/car/${id}`);
  }
}
