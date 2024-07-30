import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/interfaces/newOrderDto';
import { OrderDetailTableService } from 'src/app/services/order-detail-table.service';

@Component({
  selector: 'app-order-addpart-modal',
  templateUrl: './order-addpart-modal.component.html',
  styleUrls: ['./order-addpart-modal.component.css']
})
export class OrderAddpartModalComponent {

  @Input() showOrderAddpartModal = false;
  @Output() closeModal = new EventEmitter<void>();

  @Input()   data: any;
  @Output()  formSubmitted = new EventEmitter<FormGroup>();



  addpartForm!: FormGroup;
  constructor( 
    private fb: FormBuilder) {
    this.addpartForm = this.fb.group({
      partnumber: ['', Validators.required],
      name: ['', Validators.required],
      price: [''],
      qty: [''],
      orderId: [''],
    })
  }

  onAddpartSubmit(){
    
    this.addpartForm.value.orderId = this.data;
    
    if(this.addpartForm.valid){
    const data = this.addpartForm.value;
    //แปลงให้เป็นตัวเลช
    this.addpartForm.value.qty = +this.addpartForm.value.qty;
    this.addpartForm.value.price = +this.addpartForm.value.price;
    console.log(`data addpartForm is ${JSON.stringify(data)}`);
    this.formSubmitted.emit(this.addpartForm);

    }
  }

  close(){
    this.showOrderAddpartModal = false;
    this.closeModal.emit();
  }


  
  // closeOrderAddpartModal(){
  //   this.close.emit();
  //   console.log('closeOrderAddpartModal');
  // }
}
