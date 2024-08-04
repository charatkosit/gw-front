import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { br, co } from '@fullcalendar/core/internal-common';
import { parseTwoDigitYear } from 'moment';
import { Car, CustomerData } from 'src/app/interfaces/customerData';
import { BrandService } from 'src/app/services/brand.service';
import { OrderTableService } from 'src/app/services/order-table.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-customer-order-create-modal',
  templateUrl: './customer-order-create-modal.component.html',
  styleUrls: ['./customer-order-create-modal.component.css']
})
export class CustomerOrderCreateModalComponent{

  @Input() data!: CustomerData;
  @Input() showOrderCreateModal = false;
  @Output() close = new EventEmitter<void>();

  showAddCarForm = false;
  orderCreateForm!: FormGroup;
  cars: Car[]= [];
  brands: string[]=[];


  constructor(private fb: FormBuilder,
    private order: OrderTableService,
    private brand:BrandService,
    private share:ShareService,
    private router: Router
   
  ) {
    console.log(`data @customerOrderCreateModal is ${JSON.stringify(this.data)}`);
    this.orderCreateForm = this.fb.group({
      sympthom: ['', Validators.required],
      description: [''],
      km: [''],
      status: [''],
      customerId: [''],
      carId:[''],
      new_licensePlate:[''],
      new_brand:[''],
      new_model:[''],
      new_year:[''],
      new_color:['']
    })
  }
  
  ngOnInit(){
    this.brand.getBrand().subscribe((data:string[])=>{
      this.brands = data
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
        //เก็บค่า carId,customerId ไว้ใน share.globalCarId, share.globalCustomerId 
        //สำหรับวางไว้ที่ header
        let objData = {customerId: this.data.id,
                        carId: +this.orderCreateForm.value.carId
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


  showToggleAddCar(){
    this.showAddCarForm = !this.showAddCarForm;
  }


}