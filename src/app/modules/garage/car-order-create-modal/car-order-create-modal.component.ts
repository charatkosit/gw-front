import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderTableService } from 'src/app/services/order-table.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-car-order-create-modal',
  templateUrl: './car-order-create-modal.component.html',
  styleUrls: ['./car-order-create-modal.component.css']
})
export class CarOrderCreateModalComponent {

  @Input() data!: any;
  @Input() showOrderCreateModal = false;
  @Output() close = new EventEmitter<void>();


  orderCreateForm!: FormGroup;
  // cars: Car[]= [];


  constructor(private fb: FormBuilder,
    private order: OrderTableService,
    private share: ShareService,
    private router: Router
   
  ) {
    console.log(`data @carOrderCreateModal is ${JSON.stringify(this.data)}`);
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
    customerId: +this.data.customers[0].id,
    carId: +this.data.id
  }
  console.log(`prepOrderCreateForm: ${JSON.stringify(prepOrderCreateForm)}`)
  if(this.orderCreateForm.valid){
    console.log(`orderCreateForm is valid ,memberId: ${this.data.memberId}`)
    this.order.createFast(this.data.memberId,prepOrderCreateForm).subscribe({
      next:(data)=>{
        console.log(`data success: ${JSON.stringify(data)}`);
        
        //เก็บค่า carId,customerId ไว้ใน share.globalCarId, share.globalCustomerId 
        //สำหรับวางไว้ที่ header
        let objData = {customerId: +this.data.customers[0].id,
                       carId: +this.data.id
         }
        this.share.updateGlobalData(objData);

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
