import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberProfile } from 'src/app/interfaces/globalData';
import { AuthService } from 'src/app/services/auth.service';
import { OrderTableService } from 'src/app/services/order-table.service';

@Component({
  selector: 'app-car-profile-modal',
  templateUrl: './car-profile-modal.component.html',
  styleUrls: ['./car-profile-modal.component.css']
})
export class CarProfileModalComponent  {


  @Input() data: any[]=[];

  @Input() showCarProfileModal = false;

  @Output() close = new EventEmitter<void>();
  
  @Output() refreshData = new EventEmitter<number>();  


  memberProfile$: Observable<MemberProfile>;
  memberId!: string;

  showCreateOrderModal = false;

  
   constructor( private auth: AuthService,
                private order: OrderTableService
   ) { 
    this.memberProfile$ = this.auth.memberProfile$;
    console.log(`data @carProfileModal is ${JSON.stringify(this.data)}`);
   }


  ngOnInit():void{
    this.auth.memberProfile$.subscribe(
      data =>{
        this.memberId = data.memberId;
      }
    )
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
