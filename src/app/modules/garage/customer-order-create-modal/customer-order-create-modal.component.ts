import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { br, co } from '@fullcalendar/core/internal-common';
import { parseTwoDigitYear } from 'moment';

@Component({
  selector: 'app-customer-order-create-modal',
  templateUrl: './customer-order-create-modal.component.html',
  styleUrls: ['./customer-order-create-modal.component.css']
})
export class CustomerOrderCreateModalComponent {

  @Input() data!: any;
  @Input() showOrderCreateModal = false;
  @Output() close = new EventEmitter<void>();
  

  orderAddCarForm!: FormGroup;
  constructor( private fb: FormBuilder) {
    console.log(`data @customerOrderCreateModal is ${JSON.stringify(this.data)}`);
    this.orderAddCarForm = this.fb.group({
      sympthom: ['', Validators.required],
      description: ['', Validators.required],
      km: [''],
      status: [''],
      customerId: [''],
      model: [''],
      brand: [''],
      year: [''],
      color: [''],
      licensePlate: ['']
    })
  }


  
  closeModal() {
    this.close.emit();
   }
  }