import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderTableService } from 'src/app/services/order-table.service';

@Component({
  selector: 'app-car-profile-modal',
  templateUrl: './car-profile-modal.component.html',
  styleUrls: ['./car-profile-modal.component.css']
})
export class CarProfileModalComponent {


  @Input() data: any[]=[];

  @Input() showCarProfileModal = false;

  @Output() close = new EventEmitter<void>();
  
  @Output() refreshData = new EventEmitter<number>();  

  showCreateOrderModal = false;
  memberId = 'A-004';
  
   constructor(
    private order: OrderTableService
   ) { 
    console.log(`data @carProfileModal is ${JSON.stringify(this.data)}`);
   }


  closeModal() {
   this.close.emit();
  }

  newOrder: any = {};
  // closeModal() {
  //   this.showCarProfileModal = false;
  // }

  openCreateOrderModal() {
    this.showCreateOrderModal = true;
  }

  closeCreateOrderModal() {
    this.showCreateOrderModal = false;
  }

  submitOrder() {
    console.log(this.newOrder);
    const preOrderData =  {
        sympthom : this.newOrder.sympthom,
        description : this.newOrder.description,
        km : +this.newOrder.km,
        customerId : this.data[0].customer.id,
        carId : this.data[0].car.id,
        status : 'open'
    }
    
    console.log(`preOrderData: ${JSON.stringify(preOrderData)}`);
    // Perform actions to save the new order
    this.order.createFast(this.memberId,preOrderData).subscribe({
      next: (data) => {
        console.log(`data Success: ${JSON.stringify(data)}`);
        this.onRefreshData();
      },
      error: (error) => {
        console.log(`error: ${JSON.stringify(error)}`);
      }
    })

    this.closeCreateOrderModal();
  }
 
 
 onRefreshData(){
     this.refreshData.emit(this.data[0].car.id);
 }

}
