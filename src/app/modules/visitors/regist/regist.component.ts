import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent implements OnInit {

  constructor(private websocketService: WebsocketService) { }

  user = {
    firstName: '',
    lastName: '',
    phone:'',
    idCard: '',
    token: '',
    destFloor: ''
    
  };

  
  ngOnInit(): void {
    this.websocketService.connect();
  }

  sendMessage(): void {
    const message:string = `{"Command": "GetReaderList"}`
    this.websocketService.sendMessage(message);
  }

  onSubmit(){

  }
  resetForm(){

  }
}
