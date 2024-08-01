import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-detail-edit-part-modal',
  templateUrl: './order-detail-edit-part-modal.component.html',
  styleUrls: ['./order-detail-edit-part-modal.component.css']
})
export class OrderDetailEditPartModalComponent {
  @Input() showEditPartModal = false;
  @Output() closeModal = new EventEmitter<void>();

  @Input()   data: any;
  @Output()  formEditSubmitted = new EventEmitter<FormGroup>();

  
   updatePartForm!: FormGroup;

  constructor(private fb: FormBuilder,
  ) {
    this.updatePartForm = this.fb.group({
       partnumber: ['', Validators.required],
       name: [''],
       qty: [''],
       price:['']
 
    })
  }

  close() {
    this.showEditPartModal = false;
    this.closeModal.emit();
  }
  
  onEditSubmit(){
    if(this.updatePartForm.valid){
      this.close();
      this.updatePartForm.value.id = this.data.id;
      const data = this.updatePartForm.value;
      console.log(`data updatePartForm is ${JSON.stringify(data)}`);
      this.formEditSubmitted.emit(this.updatePartForm);
      
    }
  }
}
