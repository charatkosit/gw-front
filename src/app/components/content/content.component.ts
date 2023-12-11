import { Component, OnInit } from '@angular/core';
import { OfficerService } from 'src/app/services/officer.service';
import { VisitorService } from 'src/app/services/visitor.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  
  officerCount:number = 0;
  visitorCount:number = 0;

  constructor(private officerService: OfficerService,
    private visitorService: VisitorService) { }

  ngOnInit(): void {
    this.visitorService.getCount().subscribe(data => {
      this.visitorCount = data;
      console.log(data)
    })

    this.officerService.getCount().subscribe(data => {
      this.officerCount = data;
      console.log(data)
    })
  }


}
