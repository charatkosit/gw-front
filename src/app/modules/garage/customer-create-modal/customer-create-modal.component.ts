import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-create-modal',
  templateUrl: './customer-create-modal.component.html',
  styleUrls: ['./customer-create-modal.component.css']
})
export class CustomerCreateModalComponent {
  @Input() showCustomerCreateModal = false;
  @Output()  formSubmitted = new EventEmitter<FormGroup>();
  @Output()  closeModal = new EventEmitter<void>();


  customerForm!: FormGroup;
  constructor( private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['']
    })
  }

  onSubmit() {
    const data = this.customerForm.value;
    console.log(`data carForm is ${JSON.stringify(data)}`);
    if (this.customerForm.valid) {
      console.log(`data customerForm is valid ${JSON.stringify(data)}`);
      this.formSubmitted.emit(this.customerForm);
    }
    
  }

  close(){
    this.showCustomerCreateModal = false;
    this.closeModal.emit();
  }
}
