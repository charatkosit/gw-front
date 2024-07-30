import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-part-modal',
  templateUrl: './update-part-modal.component.html',
  styleUrls: ['./update-part-modal.component.css']
})
export class UpdatePartModalComponent {

  @Input() showEditPartModal = false;
  @Output() closeModal = new EventEmitter<void>();

  @Input()   data: any;
  @Output()  formEditSubmitted = new EventEmitter<FormGroup>();

  editPartForm!: FormGroup;

  constructor(private fb: FormBuilder,
  ) {
    this.editPartForm = this.fb.group({
       partnumber: ['', Validators.required],
       name: [''],
       price: [''],
       qty: ['']
         
   
    })
  }

  close() {
    this.showEditPartModal = false;
    this.closeModal.emit();
  }
  
  onEditPartSubmit(){
    if(this.editPartForm.valid){
      this.close();
      this.editPartForm.value.orderId = this.data.orderId;
      const data = this.editPartForm.value;
      console.log(`data updateStatusForm is ${JSON.stringify(data)}`);
      this.formEditSubmitted.emit(this.editPartForm);
      
    }
  }

}
