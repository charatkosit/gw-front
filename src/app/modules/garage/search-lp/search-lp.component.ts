import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-lp',
  templateUrl: './search-lp.component.html',
  styleUrls: ['./search-lp.component.css']
})
export class SearchLPComponent {

searchForm! : FormGroup
totalFound! : number;
}
