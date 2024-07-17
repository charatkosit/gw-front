import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-create-modal',
  templateUrl: './order-create-modal.component.html',
  styleUrls: ['./order-create-modal.component.css']
})
export class OrderCreateModalComponent {
  @Output() formSubmitted = new EventEmitter<FormGroup>();

  orderForm!: FormGroup;
  memberId = 'A-004';
 
  constructor(private fb: FormBuilder) {
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
      km: ['']
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
