import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-officer-list',
  templateUrl: './officer-list.component.html',
  styleUrls: ['./officer-list.component.css']
})
export class OfficerListComponent implements OnInit {

  constructor() { }
  data: any[] =  [];
  ngOnInit(): void {
  }

}
