import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarTableService } from 'src/app/services/car-table.service';
import { CustomerTableService } from 'src/app/services/customer-table.service';
import { OrderTableService } from 'src/app/services/order-table.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent {

  customerId!:number;
  memberId!:string;
  customerData!:any;
  orderData!:any;

  constructor( private share:ShareService,
               private router:Router,
               private customer:CustomerTableService,
               private car:CarTableService,
               private order:OrderTableService,
  )
  {}
  ngOnInit(): void {
   this.customerId = this.share.customerId;
   this.memberId = this.share.memberId;
   console.log(`at customer-profile : customerId is${this.customerId}`)
   this.loadData(this.customerId, this.memberId) 
  }

  loadData(customerId:number, memberId:string){
    this.customer.findById(customerId,memberId).subscribe({
      next:(data)=>{
        this.customerData= data;
        console.log(`dataaaa is : ${JSON.stringify(data)}`)
        this.onViewOrder(this.customerData.cars[0].id)
      },
      error:(error)=>{
        console.log(`error: ${error}`)
      }
    });

    
  }


  onViewOrder(carId:number){
    this.order.findByCarId(carId, this.memberId).subscribe({
      next: (data) => {
        console.log(`data is ${JSON.stringify(data)}`);
        this.orderData = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onViewOrderDetail(orderId:number){
    // this.order.findByCarId(carId, this.memberId).subscribe({
    //   next: (data) => {
    //     console.log(`data is ${JSON.stringify(data)}`);
    //     this.orderData = data;
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // });
  }
}
