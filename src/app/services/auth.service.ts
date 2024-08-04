import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MemberProfile } from '../interfaces/globalData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


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
  //******************************************************/
  private memberProfile = new BehaviorSubject<MemberProfile>(this.checkInitialMemberProfile());
  memberProfile$ = this.memberProfile.asObservable();


  // ตรวจสอบสถานะล็อกอินเริ่มต้นจาก localStorage
  private checkInitialMemberProfile() {
    const savedMemeberProfile = localStorage.getItem('memberProfile');
    if (savedMemeberProfile) {
      const objMemberProfile = JSON.parse(savedMemeberProfile);
      console.log(`objMemberProfile: ${JSON.stringify(objMemberProfile)}`)
      return objMemberProfile;
    }
  }


  // อัพเดทสถานะล็อกอินและเก็บลงใน localStorage
  updateMemberProfile(memberProfile: MemberProfile): void {
    this.memberProfile.next(memberProfile);

    //แปลง obj -> json ก่อน
    localStorage.setItem('memberProfile',JSON.stringify(memberProfile));

  }


    //ล้าง array carsProfile
    clearMemberProfile():void{
      // this.memberProfile.next();
      localStorage.setItem('memberProfile','')
    }
  
  //**************************************************************** */    


  getBackVersion() {
    return this.http.get<any>('api/auth/version', { responseType: 'json' })
  }


}
