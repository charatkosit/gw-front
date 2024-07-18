import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-edit-modal',
  templateUrl: './customer-edit-modal.component.html',
  styleUrls: ['./customer-edit-modal.component.css']
})
export class CustomerEditModalComponent {
  
  @Input() showCustomerEditModal = false;
  @Output() closeModal = new EventEmitter<void>();

  @Input()   data: any;
  @Output()  formEditSubmitted = new EventEmitter<FormGroup>();


  customerForm!: FormGroup;

  constructor(private fb: FormBuilder,
  ) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      address: [''],
      phone: ['', Validators.required],
      
   
    })
  }

  close(){
    this.showCustomerEditModal = false;
    this.closeModal.emit();
  }

  onEditSubmit() {
    const data = this.customerForm.value;
    console.log(`data customerForm is ${JSON.stringify(data)}`);
    if (this.customerForm.valid) {
      console.log(`data carForm is valid ${JSON.stringify(data)}`);
      this.formEditSubmitted.emit(this.customerForm);
    }
    
  }
}
