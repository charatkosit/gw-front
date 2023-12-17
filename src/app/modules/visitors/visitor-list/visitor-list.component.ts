import { Component, OnInit } from '@angular/core';
import { VisitorService } from 'src/app/services/visitor.service';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css']
})
export class VisitorListComponent implements OnInit {
  data: any[] =  [];
  // dtOptions: DataTables.Settings = {};

  constructor(private visitorService: VisitorService) { }

  ngOnInit(): void {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   processing: true
    //   // คุณสามารถเพิ่มตัวเลือกอื่นๆ ตามต้องการ
    // };
    this.visitorService.getData().subscribe(data => {
      this.data = data;
      console.log(data)
    })
  }




}
