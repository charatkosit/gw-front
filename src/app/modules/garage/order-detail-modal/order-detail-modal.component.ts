import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-detail-modal',
  templateUrl: './order-detail-modal.component.html',
  styleUrls: ['./order-detail-modal.component.css']
})
export class OrderDetailModalComponent {

  productForm!: FormGroup;
  totalAmount = 0;
  products: any[] = [];

  @Output()  formSubmitted = new EventEmitter<FormGroup>();
  
  constructor(
    private fb: FormBuilder,
  ) { 
    this.productForm = this.fb.group({
      productName: [''],
      productPrice: [''],
      productAmount: [''],
    })
  }


  onSubmit() {  }

  addProduct() {}
}
