import { Component, OnInit } from '@angular/core';
import { VisitorService } from 'src/app/services/visitor.service';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css']
})
export class VisitorListComponent implements OnInit {
  data: any[] =  [];
  constructor(private visitorService: VisitorService) { }

  ngOnInit(): void {
    this.visitorService.getData().subscribe(data => {
      this.data = data;
      console.log(data)
    })
  }

}
