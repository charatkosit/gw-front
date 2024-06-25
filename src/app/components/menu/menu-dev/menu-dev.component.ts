import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-dev',
  templateUrl: './menu-dev.component.html',
  styleUrls: ['./menu-dev.component.css']
})
export class MenuDevComponent {
  selectedMenu: string = '';

  
  constructor() { }
  
  setSelectedMenu(menu: string) {
    this.selectedMenu = menu;
  }
}
