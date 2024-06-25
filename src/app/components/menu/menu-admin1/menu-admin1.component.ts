import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-admin1',
  templateUrl: './menu-admin1.component.html',
  styleUrls: ['./menu-admin1.component.css']
})
export class MenuAdmin1Component {
  selectedMenu: string = '';

  
  constructor() { }
  
  setSelectedMenu(menu: string) {
    this.selectedMenu = menu;
  }
}
