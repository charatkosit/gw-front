import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-car-profile-modal',
  templateUrl: './car-profile-modal.component.html',
  styleUrls: ['./car-profile-modal.component.css']
})
export class CarProfileModalComponent {

  @Input() data: any[]=[];

  @Input() showCarProfileModal = false;

  @Output() close = new EventEmitter<void>();
  
  
   constructor() { 
    console.log(`data @carProfileModal is ${JSON.stringify(this.data)}`);
   }


  closeModal() {
   this.close.emit();
  }
}
