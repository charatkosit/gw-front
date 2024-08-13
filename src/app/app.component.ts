import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ShareService } from './services/share.service';
import { OrderTableService } from './services/order-table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Garage Work';
  constructor(public auth: AuthService,
              private order: OrderTableService,
              private share: ShareService
  ){
    //สมมุติให้มีการ login เข้ามา
    // this.auth.updateLoginStatus(false)
  }
  loginStatus = this.auth.loginStatus$;

  ngOnInit() {

    this.order.statusOpen('A-004').subscribe(data => {
      console.log(`statusOpen: ${JSON.stringify(data)}`);
      const preData = data;
      this.share.initialize(preData);      
    });
  }
}
