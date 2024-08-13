import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ActiveProfile, GlobalProfile, MemberProfile } from 'src/app/interfaces/globalData';
import { AuthService } from 'src/app/services/auth.service';
import { CarTableService } from 'src/app/services/car-table.service';
import { OrderTableService } from 'src/app/services/order-table.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  user_name = '';
  user_code = '';
  permission = '';
  isSecondLogin = false;

  activeCar$: Observable<ActiveProfile>;
  activeCar!: ActiveProfile;
  carId!: number;
  licensePlate!: string;


  memberProfile$: Observable<MemberProfile>;
  memberId!: string;

  carProfiles$: Observable<GlobalProfile[]>;
  carsProfile!  : GlobalProfile[];



  // arrayLp: any[] = [];

  constructor(private auth: AuthService,
    private car: CarTableService,
    private order: OrderTableService,
    private share: ShareService,

    private router: Router
  ) {
    this.memberProfile$ = this.auth.memberProfile$;
    this.carProfiles$ = this.share.profiles$;
    this.activeCar$ = this.share.activeCar$;


  }

  // ngOnInit(): void {
  //   this.memberProfile$.pipe(
  //     switchMap(data => {
  //       this.memberId = data.memberId;
  //       return this.activeCar$;
  //     })
  //   ).subscribe(data => {
  //     this.carId = data.carId;
  //     this.loadData();
  //   });
  // }
  ngOnInit(): void {


    this.auth.memberProfile$.subscribe(
      data =>{
         this.memberId=  data.memberId
         console.log(`memberId : ${this.memberId}`)
      }
    );
    


    this.share.activeCar$.subscribe(
      data => {
        this.activeCar = data
        console.log(`activeCar : ${JSON.stringify(this.activeCar)}`)
      }
    )
  }


  loadData() {
    this.car.findById(this.carId, this.memberId).subscribe(
      data => {
        console.log(`data@header :${JSON.stringify(data)}`)
        this.licensePlate = data.licensePlate;
      }
    )
  }

  onClickLogOut() {
    this.auth.updateLoginStatus(false);
    this.auth.clearMemberProfile();
    this.router.navigate(['/login']);
  }

  onClickToProfile() {
    this.router.navigate(['/garage/main'])
  }

  onClickLP(item: any) {
    console.log(item)
    let objData = {
      customerId: item.customerId,
      carId: item.carId,
      orderId: item.orderId
    }

    this.share.updateGlobalData(objData);

  }
}
