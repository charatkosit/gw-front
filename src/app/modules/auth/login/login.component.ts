import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.auth.updateLoginStatus(false);  //เมื่อใดที่มีการ back กลับมาที่ /login  ต้องเอา menu,header,footer ออก
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  loginStatus = this.auth.loginStatus$;


  login() {
    const memberProfile = {
       memberId: 'A-004',
       role: 'member'
    }
    this.auth.updateLoginStatus(true)
    this.auth.updateMemberProfile(memberProfile)
    this.router.navigate(['/garage/search']);

  }

}
