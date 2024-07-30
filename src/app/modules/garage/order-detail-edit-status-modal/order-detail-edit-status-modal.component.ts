import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-detail-edit-status-modal',
  templateUrl: './order-detail-edit-status-modal.component.html',
  styleUrls: ['./order-detail-edit-status-modal.component.css']
})
export class OrderDetailEditStatusModalComponent {

  @Input() showEditStatusModal = false;
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
    this.showEditStatusModal = false;
    this.closeModal.emit();
  }
  
  onEditSubmit(){
    if(this.updateStatusForm.valid){
      this.close();
      this.updateStatusForm.value.orderId = this.data.orderId;
      const data = this.updateStatusForm.value;
      console.log(`data updateStatusForm is ${JSON.stringify(data)}`);
      this.formEditSubmitted.emit(this.updateStatusForm);
      
    }
  }

}

