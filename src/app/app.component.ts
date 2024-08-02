import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Garage Work';
  constructor(public auth: AuthService){
    //สมมุติให้มีการ login เข้ามา
    // this.auth.updateLoginStatus(false)
  }
  loginStatus = this.auth.loginStatus$;
}
