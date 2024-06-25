import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }
  permission = 'member';
  isAdmin: boolean = false;
  isMember: boolean = false;
  isSale: boolean = false;
  isDev: boolean = false;

  selectedMenu = '';
  openMenu: string = '';
  
  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    // this.user_name = localStorage.getItem(environment.user_name);
    this.getStatusAdmin();
  }

  setSelectedMenu(menu:string){
    this.selectedMenu = menu;
  }
  getStatusAdmin() {
    // this.permission = localStorage.getItem(environment.permission);
   
    if (this.permission === 'admin') {
      this.isAdmin = true;
      this.isSale = false;
      this.isMember = false;
      this.isDev = false;
    } else if (this.permission === 'sale') {
      this.isAdmin = false;
      this.isSale = true;
      this.isMember = false;
      this.isDev = false;
    } else if (this.permission === 'dev') {
      this.isAdmin = false;
      this.isSale = false;
      this.isMember = false;
      this.isDev = true;
    } else if (this.permission === 'member') {
      this.isAdmin = false;
      this.isSale = false;
      this.isMember = true;
      this.isDev = false;
    } else {
      this.isAdmin = false;
      this.isSale = false;
      this.isMember = false;
      this.isDev = false;
    
    }

  }

  setOpenMenu(menu: string) {
    this.openMenu = menu;
    this.setSelectedMenu(menu);

  }
}
