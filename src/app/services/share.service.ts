import { Injectable } from '@angular/core';
import { toyota} from './epcBrand/toyota';
import { mg } from './epcBrand/mg';
import { honda } from './epcBrand/honda';
import { mazda } from './epcBrand/mazda';
import { isuzu } from './epcBrand/isuzu';
import { crossRef} from './crossRef/crossRef';
import { ApiEpcDetails } from '../interfaces/ApiEpcDetails';
import { newOrderDto } from '../interfaces/newOrderDto';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
 
  memberId = 'A-004';

  //สำหรับส่งค่า จาก  order ไปยัง orderDetail
  orderId!:number;
  //สำหรับส่งค่า จาก  customer ไปยัง customerProfile
  customerId!:number;

  constructor() { }

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
