import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


   //******************************************* 
   private loginStatus = new BehaviorSubject<boolean>(this.checkInitialLoginStatus());
   loginStatus$ = this.loginStatus.asObservable();
   
 
   // ตรวจสอบสถานะล็อกอินเริ่มต้นจาก localStorage
   private checkInitialLoginStatus(): boolean {
     const savedStatus = localStorage.getItem('isLoggedIn');
     return savedStatus === 'true' ? true : false;
   }
 
 
   // อัพเดทสถานะล็อกอินและเก็บลงใน localStorage
   updateLoginStatus(isLoggedIn: boolean): void {
     this.loginStatus.next(isLoggedIn);
     localStorage.setItem('isLoggedIn', isLoggedIn.toString());
   }
 
   //**************************************************************** */    
 

  getBackVersion() {
    return this.http.get<any>('api/auth/version', { responseType: 'json' })
  }


}
