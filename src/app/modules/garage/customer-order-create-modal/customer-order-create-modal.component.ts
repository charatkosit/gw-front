import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { br, co } from '@fullcalendar/core/internal-common';
import { parseTwoDigitYear } from 'moment';
import { Car, CustomerData } from 'src/app/interfaces/customerData';
import { OrderTableService } from 'src/app/services/order-table.service';

@Component({
  selector: 'app-customer-order-create-modal',
  templateUrl: './customer-order-create-modal.component.html',
  styleUrls: ['./customer-order-create-modal.component.css']
})
export class CustomerOrderCreateModalComponent{

  @Input() data!: CustomerData;
  @Input() showOrderCreateModal = false;
  @Output() close = new EventEmitter<void>();


  orderCreateForm!: FormGroup;
  cars: Car[]= [];


  constructor(private fb: FormBuilder,
    private order: OrderTableService,
    private router: Router
   
  ) {
    console.log(`data @customerOrderCreateModal is ${JSON.stringify(this.data)}`);
    this.orderCreateForm = this.fb.group({
      sympthom: ['', Validators.required],
      description: [''],
      km: [''],
      status: [''],
      customerId: [''],
      carId:['']
    })
  }
  


 
submitOrderCreate(){
  const prepOrderCreateForm = {
    sympthom: this.orderCreateForm.value.sympthom,
    description: this.orderCreateForm.value.description,
    km: +this.orderCreateForm.value.km,
    status: 'open',
    customerId: this.data.id,
    carId: +this.orderCreateForm.value.carId
  }
  console.log(`prepOrderCreateForm: ${JSON.stringify(prepOrderCreateForm)}`)
  if(this.orderCreateForm.valid){
    console.log(`orderCreateForm is valid ,memberId: ${this.data.memberId}`)
    this.order.createFast(this.data.memberId,prepOrderCreateForm).subscribe({
      next:(data)=>{
        console.log(`data success: ${JSON.stringify(data)}`);
        this.onRefreshData();
        this.router.navigate(['/garage/order-list'])
      },
      error:(error)=>{
        console.log(`error: ${JSON.stringify(error)}`)
      }
    })
    
  } else{
    console.log('orderCreateForm is invalid')
  }
}

onRefreshData(){

}

  closeModal() {
    this.close.emit();
  }
}