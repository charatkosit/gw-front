import { Component, OnInit } from '@angular/core';
import { finalize, forkJoin, Observable, switchMap, tap } from 'rxjs';
import { ActiveProfile, MemberProfile } from 'src/app/interfaces/globalData';
import { AuthService } from 'src/app/services/auth.service';
import { CarTableService } from 'src/app/services/car-table.service';
import { OrderTableService } from 'src/app/services/order-table.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-main-car',
  templateUrl: './main-car.component.html',
  styleUrls: ['./main-car.component.css']
})
export class MainCarComponent implements OnInit {

  carData: any;
  orderData!: any[];

  data$: Observable<ActiveProfile>;
  carId!: number;
  customerId!: number;

  objData!: any;

  memberProfile$: Observable<MemberProfile>;
  memberId!: string;

  constructor(private auth: AuthService,
    private order: OrderTableService,
    private car: CarTableService,
    private share: ShareService
  ) {
    this.memberProfile$ = this.auth.memberProfile$;
    this.data$ = this.share.activeCar$;
  }

  ngOnInit(): void {
    this.memberProfile$.pipe(
      switchMap(data => {
        this.memberId = data.memberId;
        return this.data$;
      })
    ).subscribe(data1 => {
      this.carId = data1.carId;
      this.customerId = data1.customerId;
      this.loadData();
    });
  }

  loadData() {
    forkJoin({
      car: this.car.findById(this.carId, this.memberId),
      order: this.order.findByCarId(this.carId, this.memberId)
    }).subscribe({
      next:
        ({ car, order }) => {
          this.carData = car;
          this.orderData = order;
          console.log(`carData is ${JSON.stringify(this.carData)}`);
          console.log(`orderData is ${JSON.stringify(this.orderData)}`);
        },
      error: error => {
        console.error('Error loading data', error);
      }
    });
  }

  onSelect(orderId: number) {
    this.objData = {  customerId: this.customerId,
                      carId: this.carId,
                      orderId: orderId
    }
    this.share.updateGlobalData(this.objData)

  }
}