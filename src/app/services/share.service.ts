import { Injectable } from '@angular/core';
import { toyota} from './epcBrand/toyota';
import { mg } from './epcBrand/mg';
import { honda } from './epcBrand/honda';
import { mazda } from './epcBrand/mazda';
import { isuzu } from './epcBrand/isuzu';
import { crossRef} from './crossRef/crossRef';
import { ApiEpcDetails } from '../interfaces/ApiEpcDetails';
import { newOrderDto } from '../interfaces/newOrderDto';
import { BehaviorSubject } from 'rxjs';
import { GlobalData } from '../interfaces/globalData';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
 
  memberId = 'A-004';

  //สำหรับส่งค่า จาก  order ไปยัง orderDetail
  orderId!:number;
  //สำหรับส่งค่า จาก  customer ไปยัง customerProfile
  customerId!:number;

  //แสดงไว้ที่ header  เมื่อมีการ รับงาน จะจดจำค่านี้ไว้
  // globalCustomerId!:number;
  // globalCarId!:number;

   
  constructor() { }
//************************************************ */
  //สร้าง ตัวแปร globalData$ สำหรับ Header
  private dataSubject = new BehaviorSubject<GlobalData>(this.checkInitialGlobalData());
    globalData$ = this.dataSubject.asObservable();


  // ดึงค่าเก่า ใน localStorage
  private checkInitialGlobalData() {
    const storedData= localStorage.getItem('globalData');
    if(storedData){
      const objData = JSON.parse(storedData);
      console.log(objData)
      return objData;
    }
  }

  updateGlobalData( objData:GlobalData):void{
    this.dataSubject.next(objData);
    localStorage.setItem('globalData', JSON.stringify(objData));
  }

//*************************************************** */
  //สร้าง ตัวแปร carsProfile$ สำหรับ Header
  private arraySubject = new BehaviorSubject<GlobalData[]>([]);
    carsProfile$ = this.arraySubject.asObservable();

 
  // ดึงค่าเก่า ใน localStorage
  private checkInitialCarsProfile() {
    const storedArrayData= localStorage.getItem('carsProfile');
    if(storedArrayData){
      const objData = JSON.parse(storedArrayData);
      console.log(objData)
      return objData;
    }
  }

  // update ค่าใน BehaviorSubject และ เก็บลงใน  localStorage
  // โดยต้องแปลง object ให้อยู่ในรูป  json.stringify ก่อน
  updateCarsProfile( carProfile:GlobalData):void{
    const currentCarsProfile = this.arraySubject.getValue();
    currentCarsProfile.push(carProfile);
    this.arraySubject.next(currentCarsProfile);
    localStorage.setItem('carsProfile',JSON.stringify(carProfile))
  }

  //ล้าง array carsProfile
  clearCarsProfile():void{
    this.arraySubject.next([]);
  }

//*************************************************** */
  epcData!: ApiEpcDetails;
      //รายชื่อรูปภาพ EPC
      imgList : string[]  = [ ...toyota, ...mg, ...honda, ...mazda, ...isuzu];

      crossRef: any[] = [...crossRef]


      preOrder: newOrderDto = {
        memberId: this.memberId,
        customer: {
          name: '',
          phone: '',
          address: ''
        },
        car: {
          model: '',
          brand: '',
          year: 0,
          color: '',
          licensePlate: ''
        },
        order: {
          sympthom: '',
          description: '',
          km: 0
        }
      }
}
