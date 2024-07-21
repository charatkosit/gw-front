import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-order-create-modal',
  templateUrl: './order-create-modal.component.html',
  styleUrls: ['./order-create-modal.component.css']
})
export class OrderCreateModalComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<FormGroup>();

  orderForm!: FormGroup;
  memberId = 'A-004';
  brands: string[] = [];
 
  constructor(
    private fb: FormBuilder,
    private brand:BrandService

  ) {
    this.orderForm = this.fb.group({
      memberId: this.memberId,
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      model: [''],
      brand: [''],
      year: [''],
      color: [''],
      licensePlate: ['', Validators.required],
      sympthom: ['', Validators.required],
      description: [''],
      km: [''],
      status:['open']
    })
  }

 ngOnInit():void{
   this.brand.getBrand().subscribe((data:string[])=>{
    this.brands =data
   })
 }

  onSubmit() {
    const data = this.orderForm.value;
    console.log(`data orderForm: ${JSON.stringify(data)}`)
  
    if (this.orderForm.valid) {
       this.formSubmitted.emit(this.orderForm);
    }


  }
}
