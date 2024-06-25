import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;


@Component({
  selector: 'app-pre-order',
  templateUrl: './pre-order.component.html',
  styleUrls: ['./pre-order.component.css']
})
export class PreOrderComponent implements OnInit {

  data: any;
  keyword: string = 'ItemName=&ItemCode=&Brand=&Model=';
  searchControl = new FormControl();


  constructor(private api: ApiService) { }

  ngOnInit(): void {




  }
}