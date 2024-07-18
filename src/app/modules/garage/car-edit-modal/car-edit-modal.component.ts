import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-edit-modal',
  templateUrl: './car-edit-modal.component.html',
  styleUrls: ['./car-edit-modal.component.css']
})
export class CarEditModalComponent {

  @Input() showCarEditModal = false;
  @Output() closeModal = new EventEmitter<void>();

  @Input()   data: any;
  @Output()  formEditSubmitted = new EventEmitter<FormGroup>();


  carForm!: FormGroup;

  constructor(private fb: FormBuilder,
  ) {
    this.carForm = this.fb.group({
      model: ['', Validators.required],
      brand: ['', Validators.required],
      year: [''],
      color: [''],
      licensePlate: ['', Validators.required],
      carId: [''],
    })
  }




  close(){
    this.showCarEditModal = false;
    this.closeModal.emit();
  }

  onEditSubmit() {
    const data = this.carForm.value;
    this.carForm.value.carId = this.data.id
    console.log(`data carForm is ${JSON.stringify(data)}`);
    if (this.carForm.valid) {
      console.log(`data carForm is valid ${JSON.stringify(data)}`);
      this.formEditSubmitted.emit(this.carForm);
    }
    
  }
}
