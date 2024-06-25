import { Injectable } from '@angular/core';
import { ShareService } from './share.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpcService {

  constructor(
    private http: HttpClient,
    public share: ShareService) {  }

  getEpcSearch(partid:string){
    return this.http.get<any>(`apiepc/v1/cross/search?crf_partid=${partid}`, { responseType: 'json' })
  }
  
  searchEpcImgInFolder(partNum:string){
    return this.http.get<any>('apiepc/v1/cross/',{ responseType: 'json' })
  }

  getCrfTotal(partid:string):Observable<number>{
    return this.http.get<any>(`apiepc/v1/cross/search?crf_partid=${partid}`)
  }

  getVersion(){
    return this.http.get<any>(`apiepc/v1/cross/version`)
  }
}
