import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // private jwtToken = localStorage.getItem(environment.access_token)


  constructor(private http: HttpClient,
  ) {

  }



  prepareDataDashboard(customer_code: any) {

  }


  getPartlistBySingleSearch(keyword: string) {
    // keyword = ItemName=&ItemCode=&Brand=&Model=
    // const uri = `${this.backendUrl}api/v1/products/pagination?${keyword}`
    const uri = `api/v1/products/singleSearch?${keyword}`

    return this.http.get<any>(uri, { responseType: 'json' })
  }

  getPartlistBySearchBrandCount(keyword: string) {

    const uri = `api/v1/products/searchBrandCount?${keyword}`

    return this.http.get<any>(uri, { responseType: 'json' })
  }

}


