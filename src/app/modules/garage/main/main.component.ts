import { Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import {ActiveProfile, MemberProfile } from 'src/app/interfaces/globalData';
import { AuthService } from 'src/app/services/auth.service';
import { CarTableService } from 'src/app/services/car-table.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {


  memberProfile$: Observable<MemberProfile>;
  memberId!: string;

  data$: Observable<ActiveProfile>;
  customerId!:number;
  carId!: number;
  orderId!: number;
  licensePlate!: string;

  constructor( private auth: AuthService,
               private share: ShareService,
               private car: CarTableService
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
    ).subscribe(data => {
      this.carId = data.carId;
      this.orderId = data.orderId;
      this.customerId = data.customerId;
      this.loadData();
    });
  }



  loadData() {
    this.car.findById(this.carId, this.memberId).subscribe(
      data => {
        console.log(`data@header :${JSON.stringify(data)}`)
        this.licensePlate = data.licensePlate;
      }
    )
  }

}
