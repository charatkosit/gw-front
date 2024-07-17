import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-create-modal',
  templateUrl: './customer-create-modal.component.html',
  styleUrls: ['./customer-create-modal.component.css']
})
export class CustomerCreateModalComponent {
 
  @Output()  formSubmitted = new EventEmitter<FormGroup>();



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
}
