import { Injectable } from '@angular/core';
import { toyota} from './epcBrand/toyota';
import { mg } from './epcBrand/mg';
import { honda } from './epcBrand/honda';
import { mazda } from './epcBrand/mazda';
import { isuzu } from './epcBrand/isuzu';
import { crossRef} from './crossRef/crossRef';
import { ApiEpcDetails } from '../interfaces/ApiEpcDetails';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

  epcData!: ApiEpcDetails;
      //รายชื่อรูปภาพ EPC
      imgList : string[]  = [ ...toyota, ...mg, ...honda, ...mazda, ...isuzu];

      crossRef: any[] = [...crossRef]
}
