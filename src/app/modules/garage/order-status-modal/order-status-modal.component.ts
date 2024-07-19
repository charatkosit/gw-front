import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-status-modal',
  templateUrl: './order-status-modal.component.html',
  styleUrls: ['./order-status-modal.component.css']
})
export class OrderStatusModalComponent {

  @Input() showOrderStatusModal = false;
  @Output() closeModal = new EventEmitter<void>();

  @Input()   data: any;
  @Output()  formEditSubmitted = new EventEmitter<FormGroup>();

  
   updateStatusForm!: FormGroup;

  constructor(private fb: FormBuilder,
  ) {
    this.updateStatusForm = this.fb.group({
       status: ['', Validators.required],
       solution: [''],
       orderId: [''],
         
   
    })
  }

  close() {
    this.showOrderStatusModal = false;
    this.closeModal.emit();
  }
  
  onEditSubmit(){
    if(this.updateStatusForm.valid){
      this.updateStatusForm.value.orderId = this.data;
       
      const data = this.updateStatusForm.value;
      console.log(`data updateStatusForm is ${JSON.stringify(data)}`);
      this.formEditSubmitted.emit(this.updateStatusForm);
    }
  }

}
