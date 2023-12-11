import { Component, OnInit } from '@angular/core';
import { OfficerService } from 'src/app/services/officer.service';

@Component({
  selector: 'app-officer-list',
  templateUrl: './officer-list.component.html',
  styleUrls: ['./officer-list.component.css']
})
export class OfficerListComponent implements OnInit {
  data: any[] =  [];
  constructor(private officerService: OfficerService) { }

  ngOnInit(): void {
    this.officerService.getData().subscribe(data => {
      this.data = data;
      console.log(data)
    })
  }

  deleteOfficer(id:number){
     this.officerService.delete(id);
     this.officerService.getData().subscribe(data=>{this.data=data})
    
  }

}
