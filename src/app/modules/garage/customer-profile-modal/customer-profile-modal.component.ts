import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-customer-profile-modal',
  templateUrl: './customer-profile-modal.component.html',
  styleUrls: ['./customer-profile-modal.component.css']
})
export class CustomerProfileModalComponent {
  
  @Input() data: any[] = [];
  @Input() showCustomerProfileModal = false;
  @Output() close = new EventEmitter<void>();
  
  
 
   constructor() { 
    console.log(`data @customerProfileModal is ${JSON.stringify(this.data)}`);
   }


  closeModal() {
   this.close.emit();
  }
}
