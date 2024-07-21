import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-car-create-modal',
  templateUrl: './car-create-modal.component.html',
  styleUrls: ['./car-create-modal.component.css']
})
export class CarCreateModalComponent {
  @Output()  formSubmitted = new EventEmitter<FormGroup>();

  carForm!: FormGroup;
  brands: string[]=[];

  constructor(
    private fb: FormBuilder,
    private brand:BrandService
  ) {
    this.carForm = this.fb.group({
      model: ['', Validators.required],
      brand: ['', Validators.required],
      year: [''],
      color: [''],
      licensePlate: ['', Validators.required],
    })
  }

  ngOnInit(){
    this.brand.getBrand().subscribe((data:string[])=>{
      this.brands = data
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
