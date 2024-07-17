import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-create-modal',
  templateUrl: './car-create-modal.component.html',
  styleUrls: ['./car-create-modal.component.css']
})
export class CarCreateModalComponent {
  @Output()  formSubmitted = new EventEmitter<FormGroup>();

  carForm!: FormGroup;

  constructor(private fb: FormBuilder,
  ) {
    this.carForm = this.fb.group({
      model: ['', Validators.required],
      brand: ['', Validators.required],
      year: [''],
      color: [''],
      licensePlate: ['', Validators.required],
    })
  }

  onSubmit() {
    const data = this.carForm.value;
    console.log(`data carForm is ${JSON.stringify(data)}`);
    if (this.carForm.valid) {
      console.log(`data carForm is valid ${JSON.stringify(data)}`);
      this.formSubmitted.emit(this.carForm);
    }
    
  }
}
