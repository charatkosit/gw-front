import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-member',
  templateUrl: './menu-member.component.html',
  styleUrls: ['./menu-member.component.css']
})
export class MenuMemberComponent {
  selectedMenu: string = '';

  
  constructor() { }
  
  setSelectedMenu(menu: string) {
    this.selectedMenu = menu;
  }
}
