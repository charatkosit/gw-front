import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { GlobalData, MemberProfile } from 'src/app/interfaces/globalData';
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

  data$: Observable<GlobalData>;
  carId!: number;
  customerId!: number;

  memberProfile$: Observable<MemberProfile>;
  memberId!: string;

  constructor(private auth: AuthService,
    private order: OrderTableService,
    private car: CarTableService,
    private share: ShareService
  ) {
    this.memberProfile$ = this.auth.memberProfile$;
    this.data$ = this.share.globalData$;
  }

  ngOnInit(): void {
    this.memberProfile$.pipe(
      switchMap(data => {
        this.memberId = data.memberId;
        return this.data$;
      })
    ).subscribe(data1 => {
      this.carId = data1.carId;
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
}