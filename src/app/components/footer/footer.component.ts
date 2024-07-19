import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ShareService } from 'src/app/services/share.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  showBack!:string;
  showAuth!:string;
  showFront!:string;

  constructor(public share:ShareService,
              private auth:AuthService
  ) { }

  ngOnInit(): void {
    this.auth.getBackRev().subscribe( res => {
      this.showBack = res.version
      console.log(`back is: ${JSON.stringify(res)}`)
      console.log(`showBack: ${this.showBack}`)
    })

    // this.auth.getAuthRev().subscribe( res => {
    //   this.showAuth = res.release
    //   console.log(`showBack: ${this.showAuth}`)
    // })
  }

  ngAfterViewInit() {
    this.showFront = environment.release;
       
  }
}
