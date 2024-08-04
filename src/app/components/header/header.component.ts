import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { GlobalData, MemberProfile } from 'src/app/interfaces/globalData';
import { AuthService } from 'src/app/services/auth.service';
import { CarTableService } from 'src/app/services/car-table.service';
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

  data$: Observable<GlobalData>;
  carId!: number;
  licensePlate!: string;


  memberProfile$: Observable<MemberProfile>;
  memberId!: string;



  constructor(private auth: AuthService,
    private car: CarTableService,
    private share: ShareService,
    private router: Router
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
      this.carId = data.carId;
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

  onClickLogOut() {
    this.auth.updateLoginStatus(false);
    this.auth.clearMemberProfile();
    this.router.navigate(['/login']);
  }

  onClickToProfile() {
    this.router.navigate(['/garage/main'])
  }
}
