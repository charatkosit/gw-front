import { Injectable } from '@angular/core';
import { toyota} from './epcBrand/toyota';
import { mg } from './epcBrand/mg';
import { honda } from './epcBrand/honda';
import { mazda } from './epcBrand/mazda';
import { isuzu } from './epcBrand/isuzu';
import { crossRef} from './crossRef/crossRef';
import { ApiEpcDetails } from '../interfaces/ApiEpcDetails';
import { newOrderDto } from '../interfaces/newOrderDto';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ActiveProfile,GlobalProfile } from '../interfaces/globalData';

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
  //สร้าง ตัวแปร activeCar$ 
  private dataSubject = new BehaviorSubject<ActiveProfile>(this.checkInitialGlobalData());
    activeCar$ = this.dataSubject.asObservable();


  // ดึงค่าเก่า ใน localStorage
  private checkInitialGlobalData() {
    const storedData= localStorage.getItem('activeCar');
    if(storedData){
      const objData = JSON.parse(storedData);
      console.log(objData)
      return objData;
    }
  }

  updateGlobalData( objData:ActiveProfile):Observable<void>{
    this.dataSubject.next(objData);
    localStorage.setItem('activeCar', JSON.stringify(objData));
    return of(void 0)
  }

//*************************************************** */
  //สร้าง ตัวแปร carsProfile$ สำหรับ Header

  preData: GlobalProfile[] =
  [{customerId:4 , carId:5 , orderId:34, lp:'ABC-0005',status:'open'  },
    {customerId:12 , carId:14 , orderId:40, lp:'AB-0014',status:'open'  },
    {customerId:9 , carId:11 , orderId:33, lp:'กษ-0011',status:'open'  },
    {customerId:14 , carId:16 , orderId:39, lp:'กก-0016',status:'open'  },
    {customerId:17 , carId:26 , orderId:26, lp:'กษ-0027',status:'open'  },
   ];

   private carProfile$ = new BehaviorSubject<GlobalProfile[]>([]);

    // Function to initialize the BehaviorSubject with preData
  initialize(preData: GlobalProfile[]): void {
    this.carProfile$.next(preData);
  }
  
   // Function to update the BehaviorSubject with a new array
   updateProfiles(newProfiles: GlobalProfile[]): void {
    this.carProfile$.next(newProfiles);
  }

  // Function to delete a profile by orderId
  deleteProfileByOrderId(orderId: number): void {
    const currentProfiles = this.carProfile$.value;
    const updatedProfiles = currentProfiles.filter(profile => profile.orderId !== orderId);
    this.carProfile$.next(updatedProfiles);
  }

  // Function to add a new profile
  addProfile(newProfile: GlobalProfile): void {
    const currentProfiles = this.carProfile$.value;
    this.carProfile$.next([...currentProfiles, newProfile]);
  }

  // Function to clear all profiles
  clearProfiles(): void {
    this.carProfile$.next([]);
  }

  // Optional: Getter to expose the BehaviorSubject as an Observable
  get profiles$() {
    return this.carProfile$.asObservable();
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
