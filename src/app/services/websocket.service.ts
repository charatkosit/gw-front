import { Injectable } from '@angular/core';
import { ReadOptions } from '../interfaces/ReadOptions';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:14820/TDKWAgent');
  }

  readingTimeMs: number = 0;

  public connect(): void {
    this.socket.onopen = (event) => {
      console.log('Connected to WebSocket', event);
      // ทำอะไรเพิ่มเติมที่นี่ถ้าต้องการ
    };

    this.socket.onmessage = (event) => {
      console.log('Message from WebSocket', event.data);
      // จัดการข้อมูลที่ได้รับที่นี่
      this.onGetMessage(event.data)
    }

    this.socket.onerror = (event) => {
      console.error('WebSocket error', event);
      // จัดการข้อผิดพลาดที่นี่
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed', event);
      // จัดการการปิดการเชื่อมต่อที่นี่
    };
  }

  // ฟังก์ชันเพื่อส่งข้อมูลไปยังเซิร์ฟเวอร์
  public sendMessage(message: string): void {
    this.socket.send(message);
  }



  getReaderlist() {
    const JS_OBJ = {
      Command: "GetReaderList",
    };
    let jsonStr = JSON.stringify(JS_OBJ);
    this.sendMessage(jsonStr);
  }


  selectReader(readername: string) {
    if (readername == "Reader not found") {
      readername = "";
    }
    const JS_OBJ = {
      Command: "SelectReader",
      ReaderName: readername,
    };
    var jsonStr = JSON.stringify(JS_OBJ);
    this.sendMessage(jsonStr);
  }


  readNIDCard() {
    // clearScreen();
    this.selectReader('');
    var cmdIDNumber = true
    var cmdText = true
    var cmdAText = true
    var cmdphoto = true

    const JS_OBJ = {
      Command: "ReadIDCard",
      IDNumberRead: cmdIDNumber,
      IDTextRead: cmdText,
      IDATextRead: cmdAText,
      IDPhotoRead: cmdphoto
    };
    var jsonStr = JSON.stringify(JS_OBJ);
    this.sendMessage(jsonStr);
    // resetTimer();
    // startTimer();
  }

  setAutoReadOptions(readOptions:ReadOptions) {
    const JS_OBJ = {
      Command: "SetAutoReadOptions",
      AutoRead:  true,    //cmdNIDAutoRead,
      IDNumberRead: true, //cmdIDNumber,
      IDTextRead: true,   //cmdText,
      IDATextRead: true,  //cmdATaxt,
      IDPhotoRead: true  //cmdphoto
    };
    var jsonStr = JSON.stringify(JS_OBJ);
    this.sendMessage(jsonStr);
  }



  onGetMessage(jsonString: string) {
    const msgObj = JSON.parse(jsonString);
    if (msgObj.Message == "AgentStatusE") {
      if (msgObj.Status == 1) {
        // this.setAutoReadOptions();
        this.getReaderlist();
      } else {
        alert("ERROR Code :" + msgObj.Status);
      }
    }

    if (msgObj.Message == "AutoReadIDCardE") {
      return msgObj;
    }

    if (msgObj.Message == "SetAutoReadOptionsR") {
      if (msgObj.Status == 0) {
        msgObj.AutoRead;
        msgObj.IDNumberRead;
        msgObj.IDTextRead;
        msgObj.IDATextRead;
        msgObj.IDPhotoRead;
        return msgObj;
      } else alert("ERROR Code :" + msgObj.Status);
    }

    if (msgObj.Message == "GetAutoReadOptionsR") {
      if (msgObj.Status == 0) {
        msgObj.AutoRead;
        msgObj.IDNumberRead;
        msgObj.IDTextRead;
        msgObj.IDATextRead;
        msgObj.IDPhotoRead;
        return msgObj;
      } else alert("ERROR Code :" + msgObj.Status);
    }

  }

  
}
