import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { GlobalData, MemberProfile } from 'src/app/interfaces/globalData';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerTableService } from 'src/app/services/customer-table.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-main-customer',
  templateUrl: './main-customer.component.html',
  styleUrls: ['./main-customer.component.css']
})
export class MainCustomerComponent implements OnInit {

  customerData: any;
  carData: any[] = [];

  data$: Observable<GlobalData>;
  customerId!: number;

  memberProfile$: Observable<MemberProfile>;
  memberId!: string;

  constructor(private auth: AuthService,
    private customer: CustomerTableService,
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
    ).subscribe(data => {
      this.customerId = data.customerId;
      this.loadData();
    });
  }

  loadData() {
    this.customer.findById(this.customerId, this.memberId).subscribe({
      next: data => {
        this.customerData = data;
        this.carData = data.cars;
        console.log(`data customer @main-customer is ${JSON.stringify(data)}`);
      },
      error: error => {
        console.error('Error loading data', error);
      }
    });

  }


  selectCarProfile(selectCarId: number) {
    let objData = {
      customerId: this.customerId,
      carId: selectCarId
    }
    this.share.updateGlobalData(objData)
  }


}
