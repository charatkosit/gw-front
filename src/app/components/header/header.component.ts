import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  user_name ='';
  user_code ='';
  permission ='';
  isSecondLogin = false;


  constructor(private auth: AuthService,
              private router: Router
  ) { }

  ngOnInit(): void {
  }

onClickLogOut(){
   this.auth.updateLoginStatus(false);
   this.router.navigate(['/login']);
}
}
